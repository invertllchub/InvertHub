// hooks/useSelection.ts
import { useEffect, useMemo, useRef, useState } from "react";

export function useSelection<T extends { id: number }>(items: T[]) {
  const [selected, setSelected] = useState<number[]>([]);
  const headerCheckboxRef = useRef<HTMLInputElement>(null);

  const toggleAll = () => {
    setSelected(selected.length === items.length ? [] : items.map((i) => i.id));
  };

  const toggleOne = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleDeleteOne = (id: number) => {
    setSelected((prev) => prev.filter((x) => x !== id));
  };

  const handleDeleteAll = () => {
    setSelected([]);
  };

  const { allSelected, someSelected } = useMemo(() => {
    const all = selected.length === items.length && items.length > 0;
    const some = selected.length > 0 && !all;
    return { allSelected: all, someSelected: some };
  }, [selected, items]);

  useEffect(() => {
    if (headerCheckboxRef.current)
      headerCheckboxRef.current.indeterminate = someSelected;
  }, [someSelected]);

  return {
    selected,
    toggleAll,
    toggleOne,
    handleDeleteOne,
    handleDeleteAll,
    allSelected,
    someSelected,
    headerCheckboxRef,
  };
}
