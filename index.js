const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// User details
const full_name = "Sonu kumar";
const dob = "25032004"; // ddmmyyyy

app.use(bodyParser.json());

app.post("/process", (req, res) => {
  try {
    const data = req.body.data;

    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        user_id: `${full_name.toLowerCase().replace(/\s+/g, "_")}_${dob}`,
        message: "Invalid input. 'data' must be an array."
      });
    }

    const even_numbers = [];
    const odd_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;
    let alphabetChars = [];

    data.forEach(item => {
      const str = String(item);

      if (/^\d+$/.test(str)) {
        const num = parseInt(str);
        sum += num;
        if (num % 2 === 0) {
          even_numbers.push(str);
        } else {
          odd_numbers.push(str);
        }
      } else if (/^[a-zA-Z]$/.test(str)) {
        alphabets.push(str.toUpperCase());
        alphabetChars.push(str);
      } else {
        special_characters.push(str);
      }
    });

    const reversedAlpha = alphabetChars.reverse();
    let concat_string = "";
    for (let i = 0; i < reversedAlpha.length; i++) {
      const ch = reversedAlpha[i];
      concat_string += i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase();
    }

    const response = {
      is_success: true,
      user_id: `${full_name.toLowerCase().replace(/\s+/g, "_")}_${dob}`,
      email: "sonu2399.be22@chitkara.edu.in",
      roll_number: "2210992399",
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string
    };

    res.json(response);
  } catch (err) {
    res.status(500).json({
      is_success: false,
      user_id: `${full_name.toLowerCase().replace(/\s+/g, "_")}_${dob}`,
      message: "An unexpected error occurred."
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
