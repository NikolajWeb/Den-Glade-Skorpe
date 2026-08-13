// ─────────────────────────────────────────────────────────────────────────
// TODO (code-along): CRUD-hook til backoffice
//
// Læsning sker via loaders (DataLoaders.jsx). Denne hook håndterer de
// handlinger, der ÆNDRER data. Med modaler bruger vi update() til redigering:
//
//   create(endpoint, formData) → POST   (dish/employee, sendes som FormData)
//   update(endpoint, body)     → PUT    (dish/employee = FormData, order = JSON)
//   remove(endpoint, id)       → DELETE, med SweetAlert-bekræftelse først
//   placeOrder(orderData)      → POST /order (JSON) — bruges fra kurven
//
// Nyttige byggeklodser:
//   - const { token } = useAuthContext();  // login er allerede bygget
//   - const revalidator = useRevalidator(); // revalidator.revalidate() genindlæser
//     loaderen, så listerne opdaterer sig selv efter create/update/delete
//   - toast.success/error (react-toastify) til feedback
//   - Authorization: `Bearer ${token}` på de beskyttede kald
//   - serverPath fra "../settings"
//
// Bemærk: modalen lukkes af formularen selv (onClose) EFTER at create/update
// er lykkedes — useCrud kalder bare revalidate() + toast.
// ─────────────────────────────────────────────────────────────────────────

import { toast } from "react-toastify";
import { useAuthContext } from "../context/useAuthContext";
//import { useRevalidator } from "react-router";

const useCrud = () => {
  const serverPath = "http://localhost:3042";
  const { token } = useAuthContext();

  const authHeader = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  //const revalidator = useRevalidator();

  // CREATE
  const create = async (endpoint, formData) => {
    try {
      const response = await fetch(`${serverPath}/${endpoint}`, {
        method: "POST",
        headers: authHeader,
        body: formData,
      });

      const text = await response.text();

      console.log("Status:", response.status);
      console.log("Backend svar:", text);

      if (!response.ok) {
        throw new Error(text || "Kunne ikke oprette");
      }

      const data = text ? JSON.parse(text) : null;

      // Genindlæs loader efter oprettelse
      //revalidator.revalidate();

      toast.success("Oprettet!");

      return data;
    } catch (error) {
      console.error("Create error:", error);
      toast.error("Der skete en fejl");
      throw error;
    }
  };

  // DELETE
  const remove = async (endpoint, id) => {
    try {
      const response = await fetch(
        `${serverPath}/${endpoint}/${id}`,
        {
          method: "DELETE",
          headers: authHeader,
        }
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Kunne ikke slette");
      }

      // Genindlæs loader efter sletning
      //revalidator.revalidate();

      toast.success("Slettet!");

      return true;
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Der skete en fejl");
      throw error;
    }
  };

  // UPDATE
  const update = async (endpoint, formData) => {
    try {
      const response = await fetch(`${serverPath}/${endpoint}`, {
        method: "PUT",
        headers: authHeader,
        body: formData,
      });

      const text = await response.text();

      console.log("Status:", response.status);
      console.log("Backend svar:", text);

      if (!response.ok) {
        throw new Error(text || "Kunne ikke opdatere");
      }

      const data = text ? JSON.parse(text) : null;

      // Genindlæs loader efter opdatering
      //revalidator.revalidate();

      toast.success("Opdateret!");

      return data;
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Kunne ikke opdatere");
      throw error;
    }
  };

  return {
    create,
    remove,
    update,
    isLoading: false,
    error: null,
  };
};

export { useCrud };