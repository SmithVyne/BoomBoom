import React, { useContext } from 'react';
import { GlobalContext } from '../../App';
import { useParams } from 'react-router-dom';
import Header from './Header'
import Section from './Section'
import Footer from '../../globals/Footer/Footer';
import duck from "../../assets/images/duck.png";
import star from "../../assets/images/star.png";
import light from "../../assets/images/light.png";
import jula from "../../assets/images/jula.png";
import goblet from "../../assets/images/goblet.png";

export default function TariffePage() {
  let { tariff } = useParams();
  const { darkTheme } = useContext(GlobalContext);
  const [selectedTrariff, setSelectedTrariff] = React.useState({});
  React.useEffect(() => {
    console.log(tariff)
    if (tariff === ':Базовый'){
      setSelectedTrariff({
        name: 'Базовый',
        img: duck,
        price: 350,
        callMin: 200,
        callMax: 500,
        gbMin: 10,
        gbMax: 40,
        sms: 100,
      })
    } else if (tariff === ':Яркий'){
      setSelectedTrariff({
        name: 'Яркий',
        img: light,
        price: 500,
        callMin: 700,
        callMax: 1000,
        gbMin: 25,
        gbMax: 55,
        sms: 500,
      })
    } else if (tariff === ':Расширенный'){
      setSelectedTrariff({
        name: 'Расширенный',
        img: jula,
        price: 800,
        callMin: 1400,
        callMax: 2000,
        gbMin: 35,
        gbMax: 95,
        sms: 1000,
      })
    } else if (tariff === ':Бизнес'){
      setSelectedTrariff({
        name: 'Бизнес',
        img: star,
        price: 1000,
        callMin: 3400,
        callMax: 4000,
        gbMin: 50,
        gbMax: 110,
        sms: 1000,
      })
    } else if (tariff === ':VIP'){
      setSelectedTrariff({
        name: 'VIP',
        img: goblet,
        price: 1500,
        callMin: 6400,
        callMax: 7000,
        gbMin: 100,
        gbMax: 160,
        sms: 1000,
      })
    } else{
      setSelectedTrariff({})
    }
    


  }, [tariff])
  return (
    <div>
      <Header darkTheme={darkTheme} tariff={selectedTrariff}/>
      <Section darkTheme={darkTheme} tariff={selectedTrariff} />

    </div>
  );
};


