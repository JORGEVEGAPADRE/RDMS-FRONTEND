import { useState } from "react";
import { createTruck } from "../services/TruckService";
import { useNavigate } from "react-router-dom";

const TruckComponent = () => {
  const [truckPatent, setTruckPatent] = useState("");
  const [truckCapacity, setTruckCapacity] = useState("");
  const [truckService, setTruckService] = useState("");
  const [truckType, setTruckType] = useState("");

  const navigator = useNavigate();

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

  function saveTruck(e) {
    e.preventDefault();

    const truck = { truckPatent, truckCapacity, truckService, truckType };
    console.log(truck);

    createTruck(truck).then((response) => {
      console.log(response.data);
      navigator("/trucks");
    });
  }

  return (
    <div className="container">
      <br />
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-6">
          <h2 className="text-center">Add Truck</h2>
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">Truck Patent:</label>
                <input
                  type="text"
                  placeholder="Enter Truck Patent"
                  name="truckPatent"
                  value={truckPatent}
                  className="form-control"
                  onChange={
                    /*handleTruckPatent */ (e) => setTruckPatent(e.target.value)
                  }
                ></input>
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
                onClick={saveTruck}
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
