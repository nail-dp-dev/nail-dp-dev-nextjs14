import { useEffect, useState } from 'react';
import { SignUpPhoneNumberProps } from '../../../../../constants/interface';
import { postPortOneCertification } from '../../../../../api/auth/validation/postPortOneCertification';
import { useRouter } from 'next/navigation';

declare global {
  interface Window {
    IMP: {
      init: (merchantId: string) => void;
      certification: (
        options: {
          channelKey: string;
          merchant_uid: string;
          company: string;
          popup?: boolean;
        },
        callback: (rsp: {
          success: boolean;
          imp_uid?: string;
          merchant_uid?: string;
          error_msg?: string;
        }) => void
      ) => void;
    };
  }
}


const CertificationPage = ({ setProcedure, setFinalPhoneNumber }: SignUpPhoneNumberProps) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter()

  useEffect(() => {

    const jQueryScript = document.createElement('script');
    jQueryScript.src = 'https://code.jquery.com/jquery-1.12.4.min.js';
    document.body.appendChild(jQueryScript);

    const iamportScript = document.createElement('script');
    iamportScript.src = 'https://cdn.iamport.kr/js/iamport.payment-1.1.6.js';
    iamportScript.onload = () => {
      const { IMP } = window;
      if (IMP) {
        IMP.init(process.env.NEXT_PUBLIC_IMP_INIT || '');

        setIsModalOpen(true);

        IMP.certification({
          channelKey: process.env.NEXT_PUBLIC_IMP_CHANNEL_KEY || '',
          merchant_uid: 'merchant_test1' + Date(),
          company: process.env.NEXT_PUBLIC_IMP_COMPANY || '',
          popup: false,
        }, async (rsp) => {
          setIsModalOpen(false);
          console.log(rsp);
          if (rsp.success && rsp.imp_uid) {
                      
            try {

              const certificationsInfo = await postPortOneCertification(rsp.imp_uid)

              if (certificationsInfo.code === 2000) {
                setFinalPhoneNumber(certificationsInfo.data)
                setProcedure('nickname')
              } else if (certificationsInfo.code === 4001) {
                alert('이미 등록 되어있는 번호입니다.')
                router.push('/')
              }

            } catch (error) {
              console.error("Error fetching token:", error);
            }

          } else {
            const msg = `인증에 실패하였습니다. 에러내용: ${rsp.error_msg}`;
            alert(msg);
          }
        });
      }
    };

    document.body.appendChild(iamportScript);

    return () => {
      document.body.removeChild(jQueryScript);
      document.body.removeChild(iamportScript);
    };
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">본인 인증</h1>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold">인증 중...</h2>
            <p className="mt-2">인증이 진행 중입니다. 잠시만 기다려 주세요.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificationPage;
