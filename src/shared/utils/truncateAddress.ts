
export function truncateAddress(address:string) {
  if (!address) return '';

  const shortenAddress = address.slice(0, 15); 
  

  return `${shortenAddress}...`;
}