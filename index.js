class Book {
  constructor(ident, tytulpolski, liczbastron, datawydania, okladka) {
    (this.ident = ident),
      (this.tytulpolski = tytulpolski),
      (this.liczbastron = liczbastron);
    this.datawydania = datawydania;
    this.okladka = okladka;
  }
}

let booksList = [];

const filterElements = (elements, value) => {
  let filteredElements = elements.filter((el) =>
    el.tytulpolski.toLowerCase().includes(value.toLowerCase())
  );
  filteredElements.length && updateTable(filteredElements);
};

//sort elements by select option value

const sortElements = (books = booksList, value) => {
  switch (value) {
    case "alphabetical-az":
      let sortedAZ = [...books].sort((a, b) =>
        a.tytulpolski.toUpperCase().localeCompare(b.tytulpolski.toUpperCase())
      );
      updateTable(sortedAZ);
      break;
    case "alphabetical-za":
      let sortedZA = [...books].sort((a, b) =>
        b.tytulpolski.toUpperCase().localeCompare(a.tytulpolski.toUpperCase())
      );
      updateTable(sortedZA);
      break;
    case "pages-up":
      let pagesUP = [...books].sort((a, b) => a.liczbastron - b.liczbastron);
      updateTable(pagesUP);
      break;
    case "pages-down":
      let pagesDOWN = [...books].sort((a, b) => b.liczbastron - a.liczbastron);
      updateTable(pagesDOWN);
      break;
    case "established-up":
      let establishedUP = [...books].sort(
        (a, b) => new Date(a.datawydania) - new Date(b.datawydania)
      );
      updateTable(establishedUP);
      break;
    case "established-down":
      let establishedDOWN = [...books].sort(
        (a, b) => new Date(b.datawydania) - new Date(a.datawydania)
      );
      updateTable(establishedDOWN);
      break;
    default:
      return booksList;
  }
};

const selectElement = document.querySelector(".sort-books");

selectElement.addEventListener("change", (event) => {
  sortElements(booksList, event.target.value);
});
const searchInput = document.querySelector(".search");

searchInput.addEventListener("keydown", (event) => {
  filterElements(booksList, event.target.value);
});

const tableBody = document.querySelector(".table-body");

//Fetch data from local file

const getData = async () => {
  await fetch("./books.json")
    .then((res) => res.json())
    .then((res) => {
      showBooks(res);
    });
};

// Loop through response from getData() function and create table body content

const showBooks = (books) => {
  for (let [index, book] of books.entries()) {
    tableBody.innerHTML += `<tr>
                <th scope="col">${index + 1}</th>
                <th scope="col">${book?.ident}</th>
                <td style="width: 50%">${book.tytul[0]}</td>
                <td>${book?.liczbastron}</td>
                 <td>${
                   book?.datawydania?.length ? book?.datawydania : "---"
                 }</td>
                <td><img src="${book?.okladka}" alt="${
      book?.tytul[0]
    }" class="img-thumbnail rounded" /></td>
              </tr>`;

    //Create new instances of class Book and push them to the booksList array
    booksList.push(
      new Book(
        book.ident,
        book.tytul[0],
        book.liczbastron,
        book.datawydania,
        book.okladka
      )
    );
  }
};

// Update table - function called in sortElements or filterElements functions
const updateTable = (data) => {
  tableBody.innerHTML = "";
  data.map((el, idx) => {
    //render new tbody content
    tableBody.innerHTML += `<tr>
                <th scope="col">${idx + 1}</th>
                <th scope="col">${el?.ident}</th>
                <td style="width: 50%">${el.tytulpolski}</td>
                <td>${el?.liczbastron}</td>
                <td>${el?.datawydania?.length ? el?.datawydania : "---"}</td>
                <td><img src="${el?.okladka}" alt="${
      el?.tytulpolski
    }" class="img-thumbnail rounded" /></td>
              </tr>`;
  });
};

getData();

//Parsing xml data from local file

// fetch("./produkty-dlabystrzakow.xml")
//   .then((res) => res.text())
//   .then((data) => {
//     let parser = new DOMParser(),
//       xmlDoc = parser.parseFromString(data, "text/xml");
//     const books = xmlDoc.getElementsByTagName("ksiazka");
//     let key = 0;
//     for (let book of books) {
//       if (key <= 5) {
//         const el = document.createElement("div");
//         el.classList.add(`book-${key}`);
//         table.appendChild(el);
//         let id = book.getAttribute("ident");
//         let pages = book.querySelector("liczbastron").innerHTML;
//         let established = book.querySelector("datawydania").innerHTML;
//         let polishTitle = book.querySelector("tytul").innerHTML;
//         el.innerHTML = id;
//         el.innerHTML += pages;
//         el.innerHTML += established;
//         el.innerHTML += polishTitle;
//         key++;
//       } else return;
//     }
//     xmlDoc.getElementsByTagName("tytul").length > 1
//       ? xmlDoc.getElementsByTagName("tytul")[0].innerHTML
//       : xmlDoc.getElementsByTagName("tytul")[250].innerHTML;
//   });
