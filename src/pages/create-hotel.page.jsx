import { Button } from "@/components/ui/button";
import { useCreateHotelMutation } from "@/lib/api";
import { toast } from "sonner";

const CreateHotelPage = () => {
  const [createHotel, { loading }] = useCreateHotelMutation();

  const handleClick = async () => {
    try {
      await createHotel({
        name: "Test Hotel",
        location: "Test Location",
        rating: 5,
        reviews: 1070,
        image:
          "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 100,
        description: "Test Description",
      }).unwrap();
      toast.success("Hotel created successfully");
    } catch (error) {
      toast.error("Hotel creation failed");
      console.error(error);
    }
  };
  return (
    <main className="container min-h-screen px-4 py-8 mx-auto">
      <h1 className="text-2xl font-bold">Create Hotel</h1>
      <div className="mt-4">
        <Button onClick={handleClick}>Create Hotel</Button>
      </div>
    </main>
  );
};

export default CreateHotelPage;
