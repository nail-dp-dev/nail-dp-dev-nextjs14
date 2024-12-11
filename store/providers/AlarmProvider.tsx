'use client';

import React, { useEffect } from 'react';

export default function AlarmProvider({ children }: { children: React.ReactNode }) {
  const urlBase64ToUint8Array = (base64String: string) => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  useEffect(() => {
    async function requestNotificationPermission() {
      if (Notification.permission === 'default') {
        const permission = await Notification.requestPermission();
        return permission === 'granted';
      }
      return Notification.permission === 'granted';
    }

    async function registerServiceWorker() {
      if ('serviceWorker' in navigator && 'PushManager' in window) {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js');
          console.log('Service Worker registered:', registration);

          const applicationServerKey = `${process.env.NEXT_PUBLIC_APPLICATIONSERVERKEY}`

          const retryGetDeviceToken = async (retries: number): Promise<void> => {
            try {
              const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(applicationServerKey),
              });
              console.log('Push Subscription:', subscription);

              const authKey = subscription.getKey('auth') || new ArrayBuffer(0);
              const p256dhKey = subscription.getKey('p256dh') || new ArrayBuffer(0);

              const authBase64 = btoa(
                String.fromCharCode(...Array.from(new Uint8Array(authKey))),
              );
              const p256dhBase64 = btoa(
                String.fromCharCode(...Array.from(new Uint8Array(p256dhKey))),
              );

              await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notifications/subscribe`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  endpoint: subscription.endpoint,
                  auth: authBase64,
                  p256dh: p256dhBase64,
                }),
                credentials: 'include',
              });
            } catch (error) {
              if (retries === 0) {
                console.error('최대 재시도 횟수 초과:', error);
                throw error;
              } else {
                console.warn(`getDeviceToken 재시도 중... 남은 횟수: ${retries}`);
                return retryGetDeviceToken(retries - 1);
              }
            }
          };

          await retryGetDeviceToken(3);
        } catch (error) {
          console.error('Error during Service Worker registration:', error);
        }
      }
    }

    async function initializeNotifications() {
      const hasPermission = await requestNotificationPermission();
      if (hasPermission) {
        await registerServiceWorker();
      } else {
        console.log('알림 권한이 없어 Service Worker를 등록하지 않습니다.');
      }
    }

    initializeNotifications();
  }, []);

  return <>{children}</>;
}
