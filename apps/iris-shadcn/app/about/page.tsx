import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import One0OneImage from "@/public/member-logos/101.png"
import AdsForNewsImage from "@/public/member-logos/AdsForNews.png";
import AnnapurnaMediaNetworkImage from "@/public/member-logos/AnnapurnaMediaNetwork.png";
import BoomImage from "@/public/member-logos/boom.png";
import BehanBox from "@/public/member-logos/behan-box.png";
import BulatlatImage from "@/public/member-logos/bulatlat.png";
import CenterImage from "@/public/member-logos/center.png";
import CilisosImage from "@/public/member-logos/cilisos.png";
import DoubleThinkLabImage from "@/public/member-logos/double-think-lab.png";
import FactlyImage from "@/public/member-logos/factly.png";
import FijiTvImage from "@/public/member-logos/fiji-tv.png";
import Fm90MhzImage from "@/public/member-logos/fm-90-mhz.png";
import HimalMediaImage from "@/public/member-logos/himal-media.png";
import IslandTimesImage from "@/public/member-logos/island-times.png";
import JaringImage from "@/public/member-logos/jaring.png";
import KiripostImage from "@/public/member-logos/kiripost.png";
import KuenselImage from "@/public/member-logos/kuensel.png";
import NewswireImage from "@/public/member-logos/newswire.png";
import NiuInitiativeImage from "@/public/member-logos/niu-initiative.png";
import PalawanNewsImage from "@/public/member-logos/palawan-news.png";
import SixtooImage from "@/public/member-logos/sixtoo.png";
import TavuliNewsImage from "@/public/member-logos/tavuli-news.png";
import ThaiImage from "@/public/member-logos/thai.png";
import TheBusinessStandardImage from "@/public/member-logos/the-business-standard.png";
import TheCaotianTimesImage from "@/public/member-logos/the-caotian-times.png";
import TimesOfKarachiImage from "@/public/member-logos/times-of-karachi.png";
import TvbcImage from "@/public/member-logos/tvbc.png";
import RedFigureLogo from "@/public/member-logos/RedFigureLogo.png";
import CamboJALogo from "@/public/member-logos/CamboJALogo.png";
import AdhdhuLogo from "@/public/member-logos/Adhdhu.png";
import ThulikaLogo from "@/public/member-logos/Thulika.png";


export default function Page() {
	const members = [
    { name: "101 East", logo: One0OneImage.src },
    { name: "Ads For News", logo: AdsForNewsImage.src },
    { name: "Annapurna Media Network", logo: AnnapurnaMediaNetworkImage.src },
    { name: "Boom", logo: BoomImage.src },
    { name: "Behan Box", logo: BehanBox.src },
    { name: "Bulatlat", logo: BulatlatImage.src },
    { name: "Center", logo: CenterImage.src },
    { name: "Cilisos", logo: CilisosImage.src },
    { name: "Double Think Lab", logo: DoubleThinkLabImage.src },
    { name: "Factly", logo: FactlyImage.src },
    { name: "Fiji TV", logo: FijiTvImage.src },
    { name: "FM 90 MHz", logo: Fm90MhzImage.src },
    { name: "Himal Media", logo: HimalMediaImage.src },
    { name: "Island Times", logo: IslandTimesImage.src },
    { name: "Jaring", logo: JaringImage.src },
    { name: "Kiripost", logo: KiripostImage.src },
    { name: "Kuensel", logo: KuenselImage.src },
    { name: "Newswire", logo: NewswireImage.src },
    { name: "Niu Initiative", logo: NiuInitiativeImage.src },
    { name: "Palawan News", logo: PalawanNewsImage.src },
    { name: "Sixtoo", logo: SixtooImage.src },
    { name: "Tavuli News", logo: TavuliNewsImage.src },
    { name: "Thai", logo: ThaiImage.src },
    { name: "The Business Standard", logo: TheBusinessStandardImage.src },
    { name: "The Caotian Times", logo: TheCaotianTimesImage.src },
    { name: "Times of Karachi", logo: TimesOfKarachiImage.src },
    { name: "TVBC", logo: TvbcImage.src },
    { name: "Red Figure Logo", logo: RedFigureLogo.src },
    { name: "CamboJA", logo: CamboJALogo.src },
    { name: "Adhdhu", logo: AdhdhuLogo.src },
    { name: "Thulika", logo: ThulikaLogo.src },
];


	return (
		<div className="min-h-screen bg-white">
			{/* Hero Section */}
			<section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					<h1 className="text-4xl font-bold text-gray-900 mb-8">About Us</h1>
					<div className="prose prose-lg max-w-none">
						<p className="text-gray-600 mb-6">
							Indopacific-factcheck is an Internews initiative that engages the media and journalists in South Asia, South East Asia and the Pacific regions. Trained Journalists from 29 media organizations in 19 countries are applying techniques and skills they have gained to produce media content that is contributing towards countering influence operations and strengthening information integrity in the region.
						</p>
						<p className="text-gray-600">
							Internews is a media support nonprofit working in 100+ countries. We training journalists, advance internet freedom, and help media outlets become financially suistainable – so that everyone has trustworthy information to make informed decisions and hold power to account.
						</p>
					</div>
				</div>
			</section>

			{/* Members Section */}
			<section className="py-16 px-4 sm:px-6 lg:px-8">
				<div className="max-w-4xl mx-auto bg-gray-50 py-16 px-4 sm:px-6" style={{ borderRadius: "3rem" }}>
					<h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Members</h2>
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
						{members.map((member, index) => (
							<Card key={index} className="bg-transparent border-none shadow-none">
								<CardContent className="p-6 flex flex-col items-center gap-4">
									<div className="w-32 h-32 rounded-full bg-white shadow-lg flex items-center justify-center p-4">
										<div className="relative w-full h-full">
											<Image
												src={member.logo}
												alt={member.name}
												fill
												className="object-contain p-2"
											/>
										</div>
									</div>
									<h3 className="text-base text-gray-600 font-medium text-center">{member.name}</h3>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>
		</div>
	)
}

