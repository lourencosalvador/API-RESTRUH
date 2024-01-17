"use client"
import axios from "axios";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type apiProps = {
  title: string;
  completed: boolean;
};

const URL: string = "https://jsonplaceholder.typicode.com/todos"

const getApi = async () => {
  const response = await axios.get<apiProps[] | null>(URL);

  return response.data
};

export default function Home() {
   const  [data, setData] = useState<apiProps[] | null>
   (null)
   const [isLoanding, setIsLoanding] = useState(false)

   const mostrandoDados = useCallback(async()=> {

      setIsLoanding(true)
      const response = await getApi()

      setIsLoanding(false)
      setData(response)
   }, [])
  useEffect(()=> {
      mostrandoDados()
  }, [mostrandoDados])
  return (
    <div className="flex justify-center items-center w-screen h-screen text-[18px]">
       {
        isLoanding ? (
          <><p>Loanding...</p></>
        ) : (
          <div className="flex flex-col gap-4">
            {
                data?.map((dados) => (
                  <>
                    
                    <div>
                    <h1>{dados.title}</h1>
                    <h3>{dados.completed}</h3>
                    </div>
                   
                  </>
                 ))
            }
           </div>
        )
       }
    </div>
  );
}
