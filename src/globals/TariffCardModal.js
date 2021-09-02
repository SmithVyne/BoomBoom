import { motion } from "framer-motion";
import styled from "styled-components";

const Wrapper = styled(motion.div)`
    position: absolute;
    width: 100%;
    height: 80%;
    background: #f1f1f1;
    border-radius: inherit;
    left: 0;
    top: 0;
    z-index: 3;
`;


export default function TariffCardModal({setShowDropDown}) {
    return (
        <Wrapper
            initial={{y: '-100%'}}
            animate={{y: 0}}
            exit={{y: '-100%'}}
            transition={{duration: 1, type: 'spring'}}
            onMouseOut={()=>setShowDropDown(false)}
        >
            
        </Wrapper>
    )
}
