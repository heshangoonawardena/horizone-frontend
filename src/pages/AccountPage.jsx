import { useUser } from "@clerk/clerk-react";

const AccountPage = () => {
  const { user } = useUser();
  return (
    <main className="container min-h-screen px-4 py-8 mx-auto">
      <h1 className="text-3xl font-bold md:text-4xl">My Account</h1>
      <div className="mt-4 ms-4">
        <h2 className="mb-4 text-xl font-semibold">Profile</h2>
        <div>
          <p>Name: {user?.fullName}</p>
          <p>Email: {user?.emailAddresses[0].emailAddress}</p>
        </div>
      </div>
    </main>
  );
};

export default AccountPage;
