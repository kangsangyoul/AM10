export default function PulseRing() {
  return (
    <div className="relative w-24 h-24 mx-auto">
      <span className="absolute inset-0 rounded-full bg-green-500 opacity-50 animate-ping" />
      <span className="absolute inset-0 rounded-full bg-green-600 opacity-75 animate-ping animation-delay-500" />
      <span className="absolute inset-0 rounded-full bg-green-700" />
      <style jsx>{`
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
      `}</style>
    </div>
  );
}
