const MomoModal = ({ momoModal, openMomoModal, setBudget }) => {
    return ( 
        <>
          { momoModal && ( <div className="modal-overlay">
            <div className="m-box">
              <h2>Add Mobile Money Wallet</h2>
              <div className="img-box">
                <img src={require('../images/mtn.jpeg')} alt="" />
                <img src={require('../images/tigo.jpeg')} alt="" />
                <img src={require('../images/voda.png')} alt="" />
              </div>
              <div className="input top-space">
                <input type="text" placeholder="Enter phone number..."/>
              </div>
              <div className="input input-two">
                <input type="text" placeholder="Enter amount..." onChange={e => setBudget(e.target.value)}/>
              </div>
              <div className="momo-box">
                <button className="add-momo-btn" onClick={openMomoModal}>Add Mobile Money Wallet</button>
              </div>
              <span className="close-bm" onClick={openMomoModal}>&times;</span>
            </div>
          </div>
          )}
        </>
     );
}
 
export default MomoModal;