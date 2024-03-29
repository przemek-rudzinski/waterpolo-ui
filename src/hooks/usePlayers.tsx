import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { Player } from "../models/Player";
import { toast } from "react-toastify";

const usePlayers = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState<Player[]>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const headers = {};

  const fetchPlayers = async () => {
    try {
      const response = await axios.get("/player/all", {
        headers,
        withCredentials: true,
      });
      setPlayers(response.data);
      setLoading(false);
    } catch (error: any) {
      toast.dismiss();
      if (error.response.status === 403) {
        toast.error("You have to log in to continue");
        navigate("/login");
      } else {
        error?.message
          ? toast.error(error.message)
          : toast.error("something went wrong");
      }
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  return { players, error, loading, refetch: fetchPlayers };
};

export default usePlayers;
