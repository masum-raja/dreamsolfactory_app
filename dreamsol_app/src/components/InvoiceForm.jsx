import React, { useState, useEffect } from "react";
import "./InvoiceForm.css";
import Modal from "./Modal";
import PrintButton from "./PrintButton";
import pdfMake from "pdfmake/build/pdfmake";
import "pdfmake/build/vfs_fonts";

const InvoiceForm = () => {
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [invoiceDueDate, setInvoiceDueDate] = useState("");
  const [imageSrc, setImageSrc] = useState(
    "https://placehold.co/300x300/e2e8f0/e2e8f0"
  );
  const [billing, setBilling] = useState({
    name: "",
    address: "",
    extra: "",
  });
  const [from, setFrom] = useState({
    name: "",
    address: "",
    extra: "",
  });
  const [invoiceValue, setInvoiceValue] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [item, setItem] = useState({
    name: "",
    hsn: "",
    qty: "",
    rate: "",
    total: 0,
    gst: 18,
  });

  const calculateNetTotal = () => {
    return invoiceValue.reduce((total, item) => total + item.total, 0);
  };

  const calculateTotalGST = () => {
    return invoiceValue.reduce((total, item) => {
      const gstAmount = (item.total * item.gst) / 100; // GST based on item subtotal
      return total + gstAmount;
    }, 0);
  };

  const netTotal = calculateNetTotal();
  const totalGST = calculateTotalGST();

  useEffect(() => {
    generateInvoiceNumber(111111, 999999);
  }, []);

  const generateInvoiceNumber = (min, max) => {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    setInvoiceNumber(`#INV-${randomNumber}`);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBillingChange = (field, value) => {
    setBilling({ ...billing, [field]: value });
  };

  const handleFromChange = (field, value) => {
    setFrom({ ...from, [field]: value });
  };

  const deleteItem = (id) => {
    setInvoiceValue(invoiceValue.filter((item) => item.id !== id));
  };

  const addItem = (newItemRows) => {
    const subtotal = newItemRows.qty * newItemRows.rate; // Exclude GST
    setInvoiceValue([...invoiceValue, { ...newItemRows, total: subtotal }]);
    setOpenModal(false);

    // Reset the item state
    setItem({
      name: "",
      hsn: "",
      qty: "",
      rate: "",
      total: 0,
      gst: 18,
    });
  };

  const printInvoice = () => {

    var docDefinition = {
      content: [
        { text: 'BARRISOL INTERIOR SOLUTION', style: 'header', alignment: 'center', margin: [0, 0, 0, 10] },
        { text: 'Invoice For- Nitesh', style: 'subheader', margin: [0, 5, 0, 2] },
        { text: 'Address: Rajasthan', margin: [0, 0, 0, 5] },
        {
          columns: [
            {},
            { 
              text: `ESTIMATE\nNo. ${invoiceNumber}`, 
              style: 'subheader', 
              alignment: 'right',
            },
          ],
          margin: [0, -40, 0, 5],
        },
        { text: `Date: ${invoiceDate}`, margin: [0, 5, 0, 5], alignment: 'right' },
        { text: 'Contact No.: +91 7014542896', margin: [0, 0, 0, 5] },
        { text: 'Place of Supply: Jaipur', margin: [0, 0, 0, 5] },
        { text: 'GSTIN Number: 09BKKPA1993B1ZB', margin: [0, 0, 0, 5] },
        { text: 'State: Rajasthan', margin: [0, 0, 0, 10] },
        {
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*', '*', '*'],
            body: [
              // Table Header
              [
                { text: 'Item Name', style: 'tableHeader' },
                { text: 'Quantity', style: 'tableHeader' },
                { text: 'Rate', style: 'tableHeader' },
                { text: 'GST', style: 'tableHeader' },
                { text: 'Total', style: 'tableHeader' },
              ],
              // Dynamically map invoice rows
              ...invoiceValue.map((invoice) => [
                invoice.name || '',
                invoice.qty || '',
                `₹${invoice.rate || 0}`,
                `${invoice.gst || 0}%`,
                `${(invoice.total * (1 + invoice.gst / 100)).toFixed(2)}`,
              ]),
            ],
          },
          layout: 'lightHorizontalLines',
          margin: [0, 10, 0, 10],
        },
        {
          text: `Total: ₹ ${netTotal.toFixed(2)}`,
          style: 'total',
          alignment: 'right',
          margin: [0, 10, 0, 10],
        },
        {
          text: `GST total: ₹ ${(netTotal + totalGST).toFixed(2)}`,
          style: 'total',
          alignment: 'right',
          margin: [0, 10, 0, 10],
        },
        {
          text: `Total (Incl. GST): ₹ ${totalGST.toFixed(2)}`,
          style: 'total',
          alignment: 'right',
          margin: [0, 10, 0, 10],
        },
        { text: 'Estimate Amount In Words: [Dynamic Amount Words]', italics: true, margin: [0, 0, 0, 10] },
        { text: 'Terms And Conditions', style: 'subheader', margin: [0, 10, 0, 5] },
        {
          ul: [
            '50% as advance along with PO',
            '25% once material reaches the site',
            'Balance 25% immediately after work completion',
          ],
          margin: [0, 0, 0, 10],
        },
        { text: 'Payment Details:', style: 'subheader', margin: [0, 10, 0, 5] },
        { text: 'Bank Name: AU SMALL FINANCE BANK', margin: [0, 0, 0, 5] },
        { text: 'Account Holder Name: BARRISOL INTERIOR SOLUTION', margin: [0, 0, 0, 5] },
        { text: 'IFSC Code: AUBL0002564', margin: [0, 0, 0, 5] },
        { text: 'Account No.: 2302256454038127', margin: [0, 0, 0, 5] },
        { text: 'Branch: Noida Sector-50', margin: [0, 0, 0, 10] },
      ],
      styles: {
        header: { fontSize: 18, bold: true },
        subheader: { fontSize: 14, bold: true },
        tableHeader: { fontSize: 12, bold: true, color: 'white', fillColor: '#4CAF50' },
        total: { fontSize:10, bold: true, color: '#FF5733', alignment: 'left' },
      },
    };
    
    pdfMake.createPdf(docDefinition).print();
  };

  return (
    <div className="main-container">
      <div className="top-border"></div>
      <div className="main-heading">
        <h2>Invoice</h2>
        <PrintButton printInvoice={printInvoice} />
      </div>
      <div className="date-container">
        <div className="form-layout">
          <div className="form-section">
            <div className="form-group">
              <label className="form-label">Invoice No.</label>
              <span className="form-separator">:</span>
              <div className="form-input-container">
                <input
                  className="form-input"
                  type="text"
                  placeholder="eg. #INV-100001"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Invoice Date</label>
              <span className="form-separator">:</span>
              <div className="form-input-container">
                <input
                  className="form-input"
                  type="date"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                />
              </div>
            </div>

            {/* <div className="form-group">
              <label className="form-label">Due Date</label>
              <span className="form-separator">:</span>
              <div className="form-input-container">
                <input
                  className="form-input"
                  type="date"
                  value={invoiceDueDate}
                  onChange={(e) => setInvoiceDueDate(e.target.value)}
                />
              </div>
            </div> */}
          </div>

          <div className="image-upload-section">
            <div className="image-container">
              <img id="image" className="image" src={imageSrc} alt="Preview" />
              <div
                className="image-overlay"
                onClick={() => document.getElementById("fileInput").click()}
              >
                <button type="button" className="overlay-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="0"
                      y="0"
                      width="24"
                      height="24"
                      stroke="none"
                    ></rect>
                    <path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
                    <circle cx="12" cy="13" r="3" />
                  </svg>
                </button>
              </div>
            </div>
            <input
              id="fileInput"
              className="hidden-input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>

      <div className="form-container">
  {/* Billing/Shipping Section */}
  <div className="form-section">
    <div>
      <label className="form-label">Bill/Ship To:</label>
      <input
        className="form-input"
        type="text"
        placeholder="Billing company name"
        value={billing.name}
        onChange={(e) => handleBillingChange("name", e.target.value)}
      />
      <input
        className="form-input"
        type="text"
        placeholder="Billing company address"
        value={billing.address}
        onChange={(e) => handleBillingChange("address", e.target.value)}
      />
      <input
        className="form-input"
        type="text"
        placeholder="City, State"
        value={billing.cityState}
        onChange={(e) => handleBillingChange("cityState", e.target.value)}
      />
      <input
        className="form-input"
        type="number"
        placeholder="Phone"
        value={billing.phone}
        onChange={(e) => handleBillingChange("phone", e.target.value)}
      />
      <input
        className="form-input"
        type="text"
        placeholder="GSTIN (if applicable)"
        value={billing.gstinNumber}
        onChange={(e) => handleBillingChange("gstinNumber", e.target.value)}
      />
    </div>
  </div>

  {/* From Section */}
  <div className="form-section">
    <div>
      <label className="form-label">From:</label>
      <input
        className="form-input"
        type="text"
        placeholder="Your company name"
        value={from.name}
        onChange={(e) => handleFromChange("name", e.target.value)}
      />
      <input
        className="form-input"
        type="text"
        placeholder="Your company address"
        value={from.address}
        onChange={(e) => handleFromChange("address", e.target.value)}
      />
      <input
        className="form-input"
        type="text"
        placeholder="City, State"
        value={from.cityState}
        onChange={(e) => handleFromChange("cityState", e.target.value)}
      />
      <input
        className="form-input"
        type="number"
        placeholder="Phone"
        value={from.phone}
        onChange={(e) => handleFromChange("phone", e.target.value)}
      />
      <input
        className="form-input"
        type="text"
        placeholder="GSTIN (if applicable)"
        value={from.gstinNumber}
        onChange={(e) => handleFromChange("gstinNumber", e.target.value)}
      />
    </div>
  </div>
</div>

      <div className="invoice-container">
        <div className="invoice-header">
          <div className="header-item">Description</div>
          <div className="header-item">Hsn</div>
          <div className="header-item">Units</div>
          <div className="header-item">Unit Price</div>
          <div className="header-item">GST</div>
          <div className="header-item">Amount</div>
        </div>

        {invoiceValue.map((invoice) => (
          <div className="invoice-item" key={invoice.id}>
            <div className="item">{invoice.name}</div>
            <div className="item">{invoice.hsn}</div>
            <div className="item">{invoice.qty}</div>
            <div className="item">{invoice.rate || 0}</div>
            <div className="item">{invoice.gst || 0}%</div>
            <div className="item">{`${(invoice.total * (1 + invoice.gst / 100)).toFixed(2)}`}</div>{" "}
            {/* Show subtotal only */}
            <div className="item">
              <button
                onClick={() => deleteItem(invoice.id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        <button className="add-item-btn" onClick={() => setOpenModal(true)}>
          Add Invoice Items
        </button>

        <div className="invoice-total">
          <div className="total-row">
            <div>Total</div>
            <div>{netTotal.toFixed(2)}</div>
          </div>
          <div className="total-row">
            <div>GST total</div>
            <div>{totalGST.toFixed(2)}</div>
          </div>
          <div className="total-row">
            <div>Total (Incl. GST)</div>
            <div>{(netTotal + totalGST).toFixed(2)}</div>
          </div>
        </div>
      </div>

      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        addItem={addItem}
        item={item}
        setItem={setItem}
      />
    </div>
  );
};

export default InvoiceForm;
