"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import HeartIcon from "../../public/assets/svg/heart.svg";
import { IconButtonProps } from "../../constants/interface";

export default function HeartButton({width,height,isClicked}:IconButtonProps) {
  const [isClick, setIsClick] = useState(isClicked);
  const [isAnimate, setIsAnimate] = useState(false);
  const [isfillRule, setIsfillRule] = useState<"evenodd"|"nonzero">(isClicked ? "nonzero":"evenodd")

  const handleClick = () => {
    setIsClick(!isClick);
    setIsAnimate(true); 
    setTimeout(() =>{
      setIsfillRule(isClick ? "evenodd":"nonzero")
    },300)
  };

  return (
    <div className={`width='${width}' height='${height}'`}>
      <motion.div
        transition={{ duration: 0.5 }}
        animate={isAnimate ? {
                scaleX: isClick ? [1, 0.8, 1, 1, 1]:[1, 0.8, 1, 1],
                scaleY: isClick ? [1, 1, 1.2, 0.8, 1, 1]:[1, 1, 1.2, 0.8, 1]
              }:{}
        }
        onClick={() => handleClick()}
        style={{
          cursor: "pointer" ,
        }}
      >
        <HeartIcon width={width} height={height} fillRule={isfillRule} />
      </motion.div>
    </div>
  );
}
