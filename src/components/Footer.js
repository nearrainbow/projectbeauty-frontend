import './Footer.css'

const Footer = () => {
  return (
    <footer>
        <div className="footer-content">
            <h3>Project beauty</h3>
            <p>Project beauty ຈຳຫນ່າຍຜະລິດຕະພັນເສີມຄວາມງາມຄົບວົງຈອນ Filler,Botox & Gluta  (Project beauty)</p>
            <ul className="socials">
                <li><a href="https://www.facebook.com/sanhtisikhod"><i className="fa fa-facebook"></i></a></li>
                {/* <li><a href="#"><i className="fa fa-twitter"></i></a></li> */}
                {/* <li><a href="#"><i className="fa fa-google-plus"></i></a></li> */}
                {/* <li><a href="#"><i className="fa fa-youtube"></i></a></li> */}
                {/* <li><a href="#"><i className="fa fa-linkedin-square"></i></a></li> */}
            </ul>
        </div>
     

    </footer>
  );
}

export default Footer