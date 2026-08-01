const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// ذاكرة مؤقتة على السيرفر لتخزين البيانات
let attendanceData = {};
let systemInstructions = "الرجاء من جميع الموظفين تسجيل الدوام عند التواجد في النطاق الجغرافي المحدد حصراً.";

// مسار جلب البيانات
app.get('/api/get-data', (req, res) => {
    res.json({
        data: attendanceData,
        instructions: systemInstructions
    });
});

// مسار حفظ وتحديث البيانات
app.post('/api/update-data', (req, res) => {
    const { data, instructions } = req.body;
    if (data) attendanceData = data;
    if (instructions) systemInstructions = instructions;
    
    res.json({ status: "success", message: "تم حفظ البيانات بنجاح" });
});

// اختبار السيرفر
app.get('/', (req, res) => {
    res.send("Attendance Server is Running Successfully!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

