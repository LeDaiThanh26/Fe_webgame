
export default function CategoryCard({
    image,
    title,
    color
}:{
    image: string,
    title: string,
    color: string
}){
    return(
        <a 
            className="relative flex flex-col justify-center p-4 h-[94px] w-[288px] rounded-[10px] overflow-hidden transition-transform duration-300 hover:scale-105 group"
            href='#'
        >
            {/* Background Image - Full width */}
            <div className="absolute inset-0 left-[30%]">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Gradient Overlay - màu từ trái sang phải mượt mà */}
            <div 
                className="absolute inset-0"
                style={{ 
                    background: `linear-gradient(to right, ${color} 0%, ${color} 35%,${color}1a 65%, transparent 100%)` 
                }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col w-[120px] text-white">
                <h2 className="text-[20px] font-bold drop-shadow-md">{title}</h2>
                <h3 className="text-[12px] font-bold drop-shadow-sm">4,050 games</h3>
            </div>
        </a>
    )
}