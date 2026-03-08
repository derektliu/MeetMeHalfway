import SearchForm from "@/components/SearchForm";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          MeetMeHalfway
        </h1>
        <p className="text-gray-500">
          Find the perfect spot between you and a friend
        </p>
      </div>
      <SearchForm />
    </div>
  );
}
