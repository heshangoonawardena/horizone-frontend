import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submit } from "@/lib/features/searchSlice";
import { Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { ShineBorder } from "./magicui/shine-border";
import SplitText from "./reactBites/SplitText";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
} from "./ui/form";

export default function Hero() {
	const dispatch = useDispatch();

	const form = useForm();

	const handleSearch = (e) => {
		e.preventDefault();
		const searchQuery = e.target.search.value;

		dispatch(submit(searchQuery));
	};

	return (
		<div className="relative z-10 flex flex-col items-center justify-center px-8 pt-32 pb-32 text-white">
			<SplitText
				text="Find Your Best Staycation"
				className="mb-8 text-4xl font-bold text-center md:text-6xl"
				animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
				threshold={0.2}
			/>
			<p className="max-w-2xl mb-12 text-xl text-center">
				Describe your dream destination and experience, and we'll find the
				perfect place for you.
			</p>

			<Form {...form}>
				<form
					onSubmit={handleSearch}
					className="flex items-center w-full max-w-3xl p-2 rounded-full bg-black/10 backdrop-blur-md lg:h-16"
				>
					<ShineBorder borderWidth={4} shineColor={"#AAA"} />
					<FormField
						control={form.control}
						name="search"
						render={({ field }) => (
							<FormItem className="flex-grow mt-8">
								<FormControl>
									<Input
										placeholder="Describe your dream destination and experience, we'll find the perfect place for you."
										type="text"
										autoComplete="off"
										className="w-full text-white bg-transparent border-none lg:text-lg placeholder:text-white/50 focus:outline-none focus:ring-0 focus:border-transparent"
										{...field}
									/>
								</FormControl>
								<FormDescription className="text-center text-white text-md">
									Search for : 'Luxury beach resort in Bali' or 'Cozy cabin in
									the mountains'
								</FormDescription>
							</FormItem>
						)}
					/>
					<Button
						type="submit"
						className="flex items-center justify-center w-48 ml-4 rounded-full gap-x-2 lg:h-12"
					>
						<Sparkles
							style={{ width: "20px", height: "20px" }}
							className="mr-2 animate-pulse text-sky-400"
						/>
						<span className="lg:text-lg">AI Search</span>
					</Button>
				</form>
			</Form>
		</div>
	);
}
