import { motion } from "framer-motion";
import { useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import styled from "styled-components";

const Line = styled.div`
    height: 5px;
    width: 100%;
    margin: 15px auto 25px;
    background: rgba(255, 255, 255, 0.44);
    display: flex;
    align-items: center;
    position: relative;
    border-radius: 2.5px;
    cursor: pointer;
`;
const Thumb = styled(motion.div)`
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: grab;
  z-index: 2;
`;

const Breakpoints = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  z-index: 1;
`;
const Breakpoint = styled.span`
  width: 12px;
  height: 12px;
  background: white;
  border: 1px solid;
  border-radius: 50%;
  background: white;
  border: none;
`;

const Level = styled(motion.div)`
  position: absolute;
  top: 0;
  bottom: 0;
  height: 100%;
  background: white;
  border-radius: 2.5px;
`;

const TariffBar = () => {
  const [location, setLocation] = useState("0px");
  const moveTo = (e) => {
    const { clientX, currentTarget } = e;
    const { left, width } = currentTarget.getBoundingClientRect();
    const location = clientX - left;
    const step1 = width / 3;
    const error = step1 / 5;
    if (location > error && location <= step1 + error) {
      setLocation(step1 - 13 + "px");
    } else if (location > step1 + error && location <= 2 * step1 + error) {
      setLocation(2 * step1 - 17 + "px");
    } else if (location > 2 * step1 + error) {
      setLocation(3 * step1 - 21 + "px");
    } else {
      setLocation("0px");
    }
  };

  return (
    <Line onClick={moveTo}>
        <Level
            animate={{ width: location }}
            transition={{ duration: 0.7, type: "spring" }}
            location={location}
        />
        <Thumb
            animate={{ x: location }}
            transition={{ duration: 0.7, type: "spring" }}
            onClick={(e) => e.stopPropagation()}
            location={location}
        >
            <MdKeyboardArrowLeft size={20} color="#4B74FC"/>
            <MdKeyboardArrowRight size={20} color="#4B74FC"/>
        </Thumb>
        <Breakpoints>
            <Breakpoint />
            <Breakpoint />
            <Breakpoint />
            <Breakpoint />
        </Breakpoints>
    </Line>
  );
};

export default TariffBar;