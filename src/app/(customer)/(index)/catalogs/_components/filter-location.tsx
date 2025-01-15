import { getLocations } from "../../lib/data";
import CheckboxFilterItem from "../../_components/checkbox-filter-item";

export default async function FilterLocation() {
  const locations = await getLocations();

  return (
    <div className="flex flex-col gap-[14px]">
      <p className="font-semibold leading-[22px]">Lokasi</p>
      {locations.map((location) => (
        <CheckboxFilterItem
          key={location.name + location.id}
          id={location.id}
          value={location.name}
          type="location"
        />
      ))}
    </div>
  );
}
