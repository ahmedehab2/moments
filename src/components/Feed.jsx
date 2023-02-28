import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import MasonaryLayout from "./MasonaryLayout";
import Spinner from "./Spinner";
export default function Feed() {
  const [Loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);
  const { categoryId } = useParams();
  useEffect(() => {
    setLoading(true);
    if (categoryId) {
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);

  if (Loading) return <Spinner message={"We Are Working..."} />;

  return pins?.length > 0 ? (
    <MasonaryLayout pins={pins} />
  ) : (
    <div className="h-40 grid place-items-center text-3xl">
      No pins available for this category
    </div>
  );
}
