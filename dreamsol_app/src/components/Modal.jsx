import "./Modal.css"; // Importing the CSS file

const Modal = ({ openModal, setOpenModal, addItem, item, setItem }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Parse inputs where necessary
    const updatedItem = {
      ...item,
      [name]:
        name === "qty" || name === "rate" || name === "gst"
          ? parseFloat(value) || 0
          : value,
    };

    // Calculate total and GST
    if (name === "qty" || name === "rate" || name === "gst") {
      const baseTotal = (updatedItem.qty || 0) * (updatedItem.rate || 0);
      const gstAmount = baseTotal * ((updatedItem.gst || 0) / 100);
      updatedItem.total = (baseTotal + gstAmount).toFixed(2); // Format total to 2 decimal places
    }

    setItem(updatedItem);
  };

  const handleSubmit = () => {
    if (item.name && item.qty && item.rate) {
      const baseTotal = parseFloat(item.qty) * parseFloat(item.rate);
      const gstTotal = baseTotal + baseTotal * ((item.gst || 0) / 100);

      const newItem = {
        ...item,
        id: Date.now(), // Generate a unique ID
        total: gstTotal, // Include GST in total
      };
      addItem(newItem);
      setOpenModal(false);
    }
  };

  return (
    <div className={`modal-container ${openModal ? "show" : ""}`}>
      <div className="modal-content">
        <div className="close-btn" onClick={() => setOpenModal(false)}>
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M16.192 6.344L11.949 10.586 7.707 6.344 6.293 7.758 10.535 12 6.293 16.242 7.707 17.656 11.949 13.414 16.192 17.656 17.606 16.242 13.364 12 17.606 7.758z" />
          </svg>
        </div>

        <div className="modal-body">
          <h2 className="modal-title">Fill your services</h2>

          <div className="flex justify-between">
            <div className="input-group">
              <label className="label">Description</label>
              <input
                className="input w-200per"
                type="text"
                name="name"
                value={item.name || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="input-group">
              <label className="label">HSN Code</label>
              <input
                className="input"
                type="number"
                name="hsn"
                value={item.hsn || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex">
            <div className="input-group">
              <label className="label">Units</label>
              <input
                className="input"
                type="number"
                name="qty"
                value={item.qty || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="input-group">
              <label className="label">Unit Price</label>
              <input
                className="input"
                type="number"
                name="rate"
                value={item.rate || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="input-group">
              <label className="label">Amount</label>
              <input
                className="input not-allowed"
                type="number"
                name="total"
                value={item.total || 0}
                readOnly
              />
            </div>
          </div>

          <div className="input-group">
            <label className="label">GST</label>
            <select
              className="input width-66per"
              name="gst"
              value={item.gst || ""}
              onChange={(e) =>
                handleInputChange({
                  target: { name: "gst", value: Number(e.target.value) },
                })
              }
            >
              <option value={5}>GST 5%</option>
              <option value={12}>GST 12%</option>
              <option value={18}>GST 18%</option>
              <option value={28}>GST 28%</option>
            </select>
          </div>

          <div className="modal-actions">
            <button className="cancel-btn" onClick={() => setOpenModal(false)}>
              Cancel
            </button>
            <button className="add-btn" onClick={handleSubmit}>
              Add Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
