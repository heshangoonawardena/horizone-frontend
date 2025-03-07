import CreateHotelForm from "@/components/CreateHotelForm";

const CreateHotelPage = () => {
  return (
    <main className="container min-h-screen px-4 py-8 mx-auto">
      <h1 className="text-3xl font-bold md:text-4xl">Create Hotel</h1>
      <div className="mt-4">
        <CreateHotelForm />
      </div>
    </main>
  );
};

export default CreateHotelPage;
