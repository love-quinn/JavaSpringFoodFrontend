import "./App.css";
import Header from "./components/header";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { useFoodData } from "./hooks/useFoodData";
import { ToastContainer } from "react-toastify";
import { useTheme } from "./components/theme-provider";


function App() {
  const { data } = useFoodData();
  const { theme } = useTheme();

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="container mx-auto">
        <div className="flex flex-col flex-grow items-center mt-10 justify-center">
          <h1 className="text-2xl">Welcome to our Menu!</h1>
          <p className="text-gray-500">
            We offer a variety of flavours to all fullfil all the tastes
          </p>
        </div>
        <div className="w-full grid px-10 mt-10 mb-20 place-items-center gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {/* Card */}
          {data?.map((foodData) => (
            <Card key={foodData.id} className="w-full hover:scale-105 transition-transform">
              <CardHeader>
                <CardTitle className="text-lg truncate overflow-hidden text-ellipsis whitespace-nowrap">
                  {foodData.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  className=" h-[200px] w-full rounded-md object-cover  transition-transform"
                  src={foodData.image}
                  alt={foodData.title}
                />
              </CardContent>
              <CardFooter className="gap-1">
                <p>USD: </p>
                <p className="text-green-500">${foodData.price.toFixed(2)}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <ToastContainer position="bottom-center" theme={theme}/>
    </div>
  );
}

export default App;
