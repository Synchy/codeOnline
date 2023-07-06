import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const BasicPriceCard = () => {
  return (
    <div className="container-basic-price-card">
      <div className="container-part-1-basic">
        <h3>BASIC</h3>
        <div className="container-price">
          <p className="price-card">0</p>
          <p className="euro">€</p>
          <p>/ mois</p>
        </div>
        <button className="button-card">S'INSCRIRE</button>
      </div>
      <div className="container-part-2-basic">
        <div className="executions-code">
          <FontAwesomeIcon icon={faCheck} />
          <p>50 executions de code par jour</p>
        </div>
        <div className="executions-code">
          <FontAwesomeIcon icon={faCheck} />
          <p>50 executions de code par jour</p>
        </div>
        <div className="executions-code">
          <FontAwesomeIcon icon={faCheck} />
          <p>50 executions de code par jour</p>
        </div>
      </div>
    </div>
  );
};

export default BasicPriceCard;
