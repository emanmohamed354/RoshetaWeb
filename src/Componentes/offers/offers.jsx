import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Styles from './offers.module.scss';

function Offers() {
  return (
    <Container>
    <div className='row'>
     <Card className={['col-xl-2 col-md-4 col-6' , Styles.card]} >
       <Card.Img variant="top" src="" className={Styles.images} />
       <Card.Body>
         <Card.Title className={Styles.text}>Ears</Card.Title>
       </Card.Body>   
     </Card>
     <Card className={['col-xl-2 col-md-4 col-6' , Styles.card]}>
       <Card.Img variant="top" src="" className={Styles.images}/>
       <Card.Body>
         <Card.Title className={Styles.text}>Eyes</Card.Title>
       </Card.Body>   
     </Card>
     <Card className={['col-xl-2 col-md-4 col-6' , Styles.card]}>
       <Card.Img variant="top" src="" className={Styles.images}/>
       <Card.Body>
         <Card.Title className={Styles.text}>Internal Diseases</Card.Title>
       </Card.Body>   
     </Card>
     <Card className={['col-xl-2 col-md-4 col-6' , Styles.card]}>
       <Card.Img variant="top" src="" className={Styles.images}/>
       <Card.Body>
         <Card.Title className={Styles.text}>Pain killers</Card.Title>
       </Card.Body>   
     </Card>
     <Card className={['col-xl-2 col-md-4 col-6' , Styles.card]}>
       <Card.Img variant="top" src="" className={Styles.images}/>
       <Card.Body>
         <Card.Title className={Styles.text}>Mental Health</Card.Title>
       </Card.Body>   
     </Card>
     <Card className={['col-xl-2 col-md-4 col-6' , Styles.card]}>
       <Card.Img variant="top" src="" className={Styles.images}/>
       <Card.Body>
         <Card.Title className={Styles.text}>Bones</Card.Title>
       </Card.Body>   
     </Card>
    </div>
</Container>

  );
}

export default Offers;