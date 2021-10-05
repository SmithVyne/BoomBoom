import Footer from '../../globals/Footer/Footer';
import Numbers from '../../components/Numbers/Numbers'
import { BUY_NUMBER} from '../../globals/utils'
import { useDispatch } from 'react-redux';
import './NumbersPage.css';

export default function NumbersPage() {
    const dispatch = useDispatch();
    function buyNumbers(numbers){      
        dispatch({ type: BUY_NUMBER, numbers  })
    }
    return (
        <>
            <Numbers buyNumbers={buyNumbers}/>
            <Footer />
        </>
    )
}
