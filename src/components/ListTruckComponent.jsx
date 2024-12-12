import { useEffect, useState } from "react";
import { deleteTruck, listTrucks } from "../services/TruckService";
import { useNavigate } from "react-router-dom";

const ListTruckComponent = () => {
  const [trucks, setTrucks] = useState([]);

  const navigator = useNavigate();

  useEffect(() => {
    getAllTrucks();
  }, []);

  function getAllTrucks() {
    listTrucks()
      .then((response) => {
        setTrucks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function addNewTruck() {
    navigator("/add-truck");
  }

  function updateTruck(id) {
    navigator(`/edit-truck/${id}`);
  }

  function removeTruck(id) {
    console.log(id);
    deleteTruck(id)
      .then((response) => {
        getAllTrucks();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="container">
      <h2 className="text-center">List of Trucks</h2>
      <button
        className="btn btn-primary mb-2"
        onClick={addNewTruck}
      >
        Add Truck
      </button>
      <table className="table table-hover table-success table-striped">
        <thead>
          <tr>
            <th className="text-center">Truck Id</th>
            <th className="text-center">Truck Patent</th>
            <th className="text-center">Truck Capacity</th>
            <th className="text-center">Truck Service</th>
            <th className="text-center">Truck Type</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {trucks.map((truck) => (
            <tr key={truck.id}>
              <td className="text-center">{truck.id}</td>
              <td className="text-center">{truck.truckPatent}</td>
              <td className="text-center">{truck.truckCapacity}</td>
              <td className="text-center">{truck.truckService}</td>
              <td className="text-center">{truck.truckType}</td>
              <td className="text-center">
                <button
                  className="btn btn-info"
                  onClick={() => updateTruck(truck.id)}
                  style={{ marginRight: "10px" }}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => removeTruck(truck.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          <tr></tr>
        </tbody>
      </table>
    </div>
  );
};

export default ListTruckComponent;
