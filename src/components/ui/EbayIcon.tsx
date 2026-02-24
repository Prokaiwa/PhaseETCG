const EbayIcon = ({ size = 'sm' }: { size?: 'sm' | 'lg' }) => (
  <span className={`font-black leading-none ${size === 'lg' ? 'text-base' : 'text-sm'}`}>
    <span style={{ color: '#E53238' }}>e</span>
    <span style={{ color: '#0064D2' }}>b</span>
    <span style={{ color: '#F5AF02' }}>a</span>
    <span style={{ color: '#86B817' }}>y</span>
  </span>
);

export default EbayIcon;
