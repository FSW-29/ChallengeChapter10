import React from "react"
import styles from "../styles/Home.module.css"

function LandingDefinitionComponent() {
    return(
        <>
        {/* ===== Landing Definiton ===== */}

            <div className={styles.landingDefiniton}>
                <div className="container-features" style={{ width: "100%", paddingTop: "5%"}}>
                    <div className="row">
                        <div className="col-6" style={{ color: "white"}}>
                        </div>
                        <div className="col-6" style={{color: "white", textAlign: "left", paddingLeft: "5%"}}>
                        <div>
                            <h5>
                            What's so special?
                            </h5>
                        </div>
                        <div>
                            <h1 style={{fontSize: "50px"}}>WEB PORTAL GAMES</h1>
                        </div>

                        
                        <div style={{width: "60%", paddingTop: "5%", paddingBottom: "5%"}}>
                            <div className="accordion" id="accordionPanelsStayOpenExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne" style={{backgroundColor: "black"}}>
                                    <h5 style={{color: "orange"}}>
                                    TRADITIONAL GAMES
                                    </h5>
                                </button>
                                </h2>
                                <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                                <div className="accordion-body" style={{backgroundColor: "black", color: "white"}}>
                                    If you miss your childhood, we provide many traditional games here.  
                                </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo" style={{backgroundColor: "black"}}>
                                    <h5 style={{color: "orange"}}>
                                    GAME SUIT
                                    </h5>
                                </button>
                                </h2>
                                <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                                <div className="accordion-body" style={{backgroundColor: "black", color: "white"}}>
                                    This game portal is suitable for all ages
                                </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree" style={{backgroundColor: "black"}}>
                                    <h5 style={{color: "orange"}}>
                                    ADDITIONAL INFORMATION
                                    </h5>
                                </button>
                                </h2>
                                <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                                <div className="accordion-body" style={{backgroundColor: "black", color: "white"}}>
                                    The game portal is currently being built by Mas-Mas Sakti!
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LandingDefinitionComponent;

