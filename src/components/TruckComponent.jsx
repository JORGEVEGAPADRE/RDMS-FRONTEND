import { useState, useEffect } from "react";
import { createTruck, getTruck, updateTruck } from "../services/TruckService";
import { useNavigate, useParams } from "react-router-dom";
const TruckComponent = () => {
  const [truckPatent, setTruckPatent] = useState("");
  const [truckCapacity, setTruckCapacity] = useState("");
  const [truckService, setTruckService] = useState("");
  const [truckType, setTruckType] = useState("");

  const { id } = useParams();
  const [errors, setErrors] = useState({
    truckPatent: "",
    truckCapacity: "",
    truckService: "",
    truckType: "",
    //email: ''
  });

  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      getTruck(id)
        .then((response) => {
          setTruckPatent(response.data.truckPatent);
          setTruckCapacity(response.data.truckCapacity);
          setTruckService(response.data.truckService);
          setTruckType(response.data.truckType);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  /*
  function handleTruckPatent(e) {
    setTruckPatent(e.target.value);
  }
  function handleTruckCapacity(e) {
    setTruckCapacity(e.target.value);
  }

  function handleTruckService(e) {
    setTruckService(e.target.value);
  }

  function handleTruckType(e) {
    setTruckType(e.target.value);
  }

  */

  /*
  const handleTruckPatent = (e) => setTruckPatent(e.target.value);
  const handleTruckCapacity = (e) => setTruckCapacity(e.target.value);
  const handleTruckService = (e) => setTruckService(e.target.value);
  const handleTruckType = (e) => setTruckType(e.target.value);
  */

  function saveOrTruck(e) {
    e.preventDefault();
    const truck = { truckPatent, truckCapacity, truckService, truckType };
    console.log(truck);

    if (validateForm()) {
      if (id) {
        updateTruck(id, truck)
          .then((response) => {
            console.log(response.data);
            navigator("/trucks");
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        createTruck(truck)
          .then((response) => {
            console.log(response.data);
            navigator("/trucks");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }

  function validateForm() {
    let valid = true;

    const errorsCopy = { ...errors };

    //Validacion para campos tipo String que no pueden ir vacios

    if (truckPatent.trim()) {
      //Esta pregunta es true si despues del trim la cadena no es vacia
      errorsCopy.truckPatent = "";
    } else {
      errorsCopy.truckPatent = "La Patente es Requerida";
      valid = false;
    }
    //Fin de validacion
    /* Ejemplo de Validacion de campos email
    if

    */
    setErrors(errorsCopy);
    return valid;
  }

  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Update Truck</h2>;
    } else {
      return <h2 className="text-center">Add Truck</h2>;
    }
  }

  return (
    <div
      className="container mx-auto"
      style={{ height: "100vh" }}
    >
      <br />
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-6">
          {pageTitle(id)}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">Truck Patent:</label>
                <input
                  type="text"
                  placeholder="Enter Truck Patent"
                  name="truckPatent"
                  value={truckPatent}
                  className={`form-control ${
                    errors.truckPatent ? "is-invalid" : ""
                  }`}
                  onChange={
                    /*handleTruckPatent */ (e) => setTruckPatent(e.target.value)
                  }
                ></input>
                {errors.truckPatent && (
                  <div className="invalid-feedback">{errors.truckPatent}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Truck Capacity:</label>
                <input
                  type="text"
                  placeholder="Enter Truck Capacity"
                  name="truckCapacity"
                  value={truckCapacity}
                  className="form-control"
                  onChange={
                    /*handleTruckCapacity */ (e) =>
                      setTruckCapacity(e.target.value)
                  }
                ></input>
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Truck Service:</label>
                <input
                  type="text"
                  placeholder="Enter Truck Service"
                  name="truckService"
                  value={truckService}
                  className="form-control"
                  onChange={
                    /*handleTruckService */ (e) =>
                      setTruckService(e.target.value)
                  }
                ></input>
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Truck Type:</label>
                <input
                  type="text"
                  placeholder="Enter Truck Type"
                  name="truckType"
                  value={truckType}
                  className="form-control"
                  onChange={
                    /* handleTruckType */ (e) => setTruckType(e.target.value)
                  }
                ></input>
              </div>
              <button
                className="btn btn-success"
                onClick={saveOrTruck}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TruckComponent;
