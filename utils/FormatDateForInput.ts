  
  
export default function formatDateForInput(dateString?: string | null) {
    if (!dateString) return "";
    const date = new Date(dateString);
    // Format YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month صفر-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}