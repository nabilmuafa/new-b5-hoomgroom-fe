import Image from "next/image";
import Link from "next/link";

const Card = () => {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mx-2 my-2">
            <div className="max-w-xs rounded overflow-hidden shadow-lg">
                <Link href={"google.com"}>
                    <Image className="w-full h-auto" src="next.svg" width={200} height={150} alt="Placeholder Image" />
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">Dummy Title</div>
                        <p className="text-gray-700 text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                </Link>
            </div>

            <div className="max-w-xs rounded overflow-hidden shadow-lg">
                <Link href={"google.com"}>
                    <Image className="w-full h-auto" src="next.svg" width={200} height={150} alt="Placeholder Image" />
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">Dummy Title</div>
                        <p className="text-gray-700 text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                </Link>
            </div>

            <div className="max-w-xs rounded overflow-hidden shadow-lg">
                <Link href={"google.com"}>
                    <Image className="w-full h-auto" src="next.svg" width={200} height={150} alt="Placeholder Image" />
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">Dummy Title</div>
                        <p className="text-gray-700 text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                </Link>
            </div>

            <div className="max-w-xs rounded overflow-hidden shadow-lg">
                <Link href={"google.com"}>
                    <Image className="w-full h-auto" src="next.svg" width={200} height={150} alt="Placeholder Image" />
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">Dummy Title</div>
                        <p className="text-gray-700 text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                </Link>
            </div>

        </div>
    );
};

export default Card;
