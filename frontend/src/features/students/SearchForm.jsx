import Button from "../../ui/Button";
import SearchBar from "../../ui/SearchBar";

export default function SearchForm() {
  return (
    <form className="grid items-center justify-center border border-slate-200 gap-4  grid-cols-[4fr_1fr] rounded-2xl w-full m-4 p-4 sm:w-96 mx-auto">
      <SearchBar />
      <Button type="submit">Search</Button>
    </form>
  );
}
