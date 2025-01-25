
const Heading = ({heading, subHeading}) => {
    return (
        <div className="w-[90%] lg:w-[70%] text-center mx-auto mt-20 mb-14">
            <p className="text-rose-600">---{subHeading}---</p>
            <hr className="w-[80%] mx-auto" />
            <hr className="w-[80%] mx-auto" />
            <h3 className="text-2xl md:text-3xl uppercase border-b-4 py-4">{heading}</h3>
        </div>
    );
};

export default Heading;