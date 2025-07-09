import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ears from '../../images/ears.jpg';
import eyes from '../../images/eyes.jpg';
import internalDiseases from '../../images/belly.jpg';
import painkillers from '../../images/painkillers.jpg';
import mentalhealth from '../../images/mentalHealth.jpeg';
import bones from '../../images/bone.jpg';
import Styles from './diseases.module.scss';

function Diseases() {
  return (
    <Container>
          <div className='row'>
           <Card className={['col-xl-2 col-md-4 col-6' , Styles.card]} >
             <Card.Img variant="top" src={ears} className={Styles.images} />
             <Card.Body>
               <Card.Title className={Styles.text}>Ears</Card.Title>
             </Card.Body>   
           </Card>
           <Card className={['col-xl-2 col-md-4 col-6' , Styles.card]}>
             <Card.Img variant="top" src={eyes} className={Styles.images}/>
             <Card.Body>
               <Card.Title className={Styles.text}>Eyes</Card.Title>
             </Card.Body>   
           </Card>
           <Card className={['col-xl-2 col-md-4 col-6' , Styles.card]}>
             <Card.Img variant="top" src={internalDiseases} className={Styles.images}/>
             <Card.Body>
               <Card.Title className={Styles.text}>Internal Diseases</Card.Title>
             </Card.Body>   
           </Card>
           <Card className={['col-xl-2 col-md-4 col-6' , Styles.card]}>
             <Card.Img variant="top" src={painkillers} className={Styles.images}/>
             <Card.Body>
               <Card.Title className={Styles.text}>Pain killers</Card.Title>
             </Card.Body>   
           </Card>
           <Card className={['col-xl-2 col-md-4 col-6' , Styles.card]}>
             <Card.Img variant="top" src={mentalhealth} className={Styles.images}/>
             <Card.Body>
               <Card.Title className={Styles.text}>Mental Health</Card.Title>
             </Card.Body>   
           </Card>
           <Card className={['col-xl-2 col-md-4 col-6' , Styles.card]}>
             <Card.Img variant="top" src={bones} className={Styles.images}/>
             <Card.Body>
               <Card.Title className={Styles.text}>Bones</Card.Title>
             </Card.Body>   
           </Card>
          </div>
    </Container>
    
   
  );
}

export default Diseases;