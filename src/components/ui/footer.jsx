import { Heart } from "lucide-react";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const sections = [
	{
		title: "Product",
		links: [
			{ name: "Overview", href: "#" },
			{ name: "Pricing", href: "#" },
			{ name: "Marketplace", href: "#" },
			{ name: "Features", href: "#" },
		],
	},
	{
		title: "Company",
		links: [
			{ name: "About", href: "#" },
			{ name: "Team", href: "#" },
			{ name: "Blog", href: "#" },
			{ name: "Careers", href: "#" },
		],
	},
	{
		title: "Resources",
		links: [
			{ name: "Help", href: "#" },
			{ name: "Sales", href: "#" },
			{ name: "Advertise", href: "#" },
			{ name: "Privacy", href: "#" },
		],
	},
];

const Footer7 = ({
	logo = {
		url: "https://horizone-frontend-heshan.netlify.app/",
		src: "/horizone.svg",
		alt: "logo",
		title: "Horizone",
	},
}) => {
	return (
		<section className="px-16 py-32">
			<div className="container">
				<footer>
					<div className="flex flex-col items-start justify-between gap-10 text-center lg:flex-row lg:text-left">
						<div className="flex flex-col items-center justify-between w-full gap-6 max-w-96 shrink lg:items-start">
							{/* Logo */}
							<div className="flex items-center gap-2 lg:justify-start">
								<a href="https://horizone-frontend-heshan.netlify.app/">
									<img
										src={logo.src}
										alt={logo.alt}
										title={logo.title}
										className="size-8"
									/>
								</a>
								<h2 className="text-xl font-semibold">{logo.title}</h2>
							</div>
							<p className="text-sm text-muted-foreground">
								Your ultimate travel companion powered by AI for smarter, faster
								search results. Effortlessly find and book your journey with our
								seamless, AI-driven experience. Start exploring today!
							</p>
							<ul className="flex items-center space-x-6 text-muted-foreground">
								<li className="font-medium hover:text-primary">
									<a
										target="_blank"
										href="https://www.instagram.com/heshan.goonawardena"
									>
										<FaInstagram className="size-6" />
									</a>
								</li>
								<li className="font-medium hover:text-primary">
									<a
										target="_blank"
										href="https://www.facebook.com/profile.php?id=100082271086921"
									>
										<FaFacebook className="size-6" />
									</a>
								</li>
								<li className="font-medium hover:text-primary">
									<a
										target="_blank"
										href="https://github.com/heshangoonawardena"
									>
										<FaGithub className="size-6" />
									</a>
								</li>
								<li className="font-medium hover:text-primary">
									<a
										target="_blank"
										href="https://www.linkedin.com/in/heshan-goonawardena-037851184"
									>
										<FaLinkedin className="size-6" />
									</a>
								</li>
							</ul>
						</div>
						<div className="grid grid-cols-3 gap-6 lg:gap-20">
							{sections.map((section, sectionIdx) => (
								<div key={sectionIdx}>
									<h3 className="mb-6 font-bold">{section.title}</h3>
									<ul className="space-y-4 text-sm text-muted-foreground">
										{section.links.map((link, linkIdx) => (
											<li
												key={linkIdx}
												className="font-medium hover:text-primary"
											>
												<a href={link.href}>{link.name}</a>
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
					</div>
					<div className="flex flex-col justify-between gap-4 pt-8 mt-20 text-sm font-medium text-center border-t text-muted-foreground lg:flex-row lg:items-center lg:text-left">
						<p>
							© 2025 horizone-frontend-heshan.netlify.app. All rights reserved.
						</p>
						<ul className="flex justify-center gap-4 lg:justify-start">
							<li className="hover:text-primary">
								<a href="#"> Terms and Conditions</a>
							</li>
							<li className="hover:text-primary">
								<a href="#"> Privacy Policy</a>
							</li>
						</ul>
					</div>
					<div className="flex items-center justify-center mt-4 text-muted-foreground">
						<span className="mr-2">Made with</span>
						<Heart size={16} fill="white" />
						<span className="ml-2">by Heshan Goonawardena</span>
					</div>
				</footer>
			</div>
		</section>
	);
};

export { Footer7 };
