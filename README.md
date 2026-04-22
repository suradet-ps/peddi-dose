# Peddi-Dose: Pediatric Dose Calculator (โปรแกรมคำนวณขนาดยาเด็ก)

<p align="center">
  <strong>เครื่องมือคำนวณขนาดยาในเด็กสำหรับบุคลากรทางการแพทย์</strong>
  <br />
  <a href="https://pedi-dose-c9cec.web.app/"><strong>ลองใช้งาน (Live Demo) »</strong></a>
</p>

<p align="center">
    <a href="https://github.com/suradet-ps/peddi-dose/blob/main/LICENSE">
        <img src="https://img.shields.io/github/license/suradet-ps/peddi-dose?style=for-the-badge" alt="License">
    </a>
    <a href="https://github.com/suradet-ps/peddi-dose/issues">
        <img src="https://img.shields.io/github/issues/suradet-ps/peddi-dose?style=for-the-badge" alt="Issues">
    </a>
    <img src="https://img.shields.io/github/stars/suradet-ps/peddi-dose?style=for-the-badge" alt="Stars">
</p>

---

**Peddi-Dose** เป็นเว็บแอปพลิเคชันที่ออกแบบมาเพื่อช่วยเภสัชกร, แพทย์, และบุคลากรทางการแพทย์ในการคำนวณขนาดยาสำหรับผู้ป่วยเด็กอย่างรวดเร็วและแม่นยำ โดยอ้างอิงจากน้ำหนักตัวของผู้ป่วย โปรแกรมจะแสดงผลลัพธ์ทั้งช่วงขนาดยา (Dose range) ในหน่วยมิลลิลิตร (ml) พร้อมทั้งแสดงข้อมูลสำคัญในการบริหารยาของยาแต่ละชนิด

<details>
<summary><strong>English Description</strong></summary>

**Peddi-Dose** is a web application designed to assist pharmacists, doctors, and healthcare professionals in quickly and accurately calculating drug dosages for pediatric patients based on their body weight. The application provides results for dose range in volume in milliliters (ml), along with important notes and warnings for each specific drug.

</details>

## 🚀 ลิงก์สำหรับใช้งาน (Live Demo)

คุณสามารถเข้าใช้งานโปรแกรมได้ทันทีผ่านเว็บเบราว์เซอร์ โดยไม่ต้องติดตั้งอะไรเพิ่มเติม

### **https://pedi-dose-c9cec.web.app/**

## ✨ คุณสมบัติหลัก (Key Features)

*   **คำนวณแบบ Real-time:** ผลลัพธ์จะอัปเดตทันทีที่คุณกรอกน้ำหนักหรือเปลี่ยนชนิดของยา
*   **รองรับยาสามัญในเด็กหลากหลายชนิด:** มีฐานข้อมูลยาที่ใช้บ่อยในเด็ก
*   **แสดงผลลัพธ์ที่ครอบคลุม:**
    *   แสดงขนาดยาต่อครั้งในหน่วย ml เพื่อง่ายต่อการบริหารยา
    *   คำนวณจากช่วงขนาดยาแนะนำ (Min-Max Dose)
*   **แสดงข้อมูลสำคัญ:** มี `Note` และ `Warning` สำหรับยาแต่ละตัว เช่น ขนาดยาสูงสุดต่อวัน (Max daily dose) หรือข้อควรระวังพิเศษ
*   **Responsive Design:** ออกแบบมาให้ใช้งานได้ดีทั้งบนคอมพิวเตอร์และโทรศัพท์มือถือ
  
## 📋 วิธีใช้งาน (How to Use)

1.  **ไปที่หน้าเว็บ:** https://pedi-dose-c9cec.web.app/
2.  **กรอกน้ำหนัก:** ใส่น้ำหนักของผู้ป่วย (kg) ในช่อง "น้ำหนักเด็ก (kg)"
3.  **เลือกยา:** เลือกยาที่ต้องการคำนวณจากเมนู "เลือกยาที่ต้องการคำนวณ"
4.  **ดูผลลัพธ์:** ผลการคำนวณจะแสดงขึ้นมาโดยอัตโนมัติในกล่อง "Result"
5.  **อ่านข้อมูลเพิ่มเติม:** อย่าลืมอ่าน `Note` และ `Warning` ที่แสดงอยู่ใต้ผลลัพธ์

## 💊 รายการยาที่มีในโปรแกรม (Available Drugs)

โปรแกรมรองรับการคำนวณยาสามัญในเด็กหลายรายการ (ข้อมูล ณ ปัจจุบัน):

*   Amoxycillin (250mg/5ml)
*   Co-amoxiclav (Augmentin, Amk) (228.5mg/5ml)
*   Bactrim (40mg/5ml)
*   CPM (2mg/5ml)
*   Dicloxacillin (62.5mg/5ml)
*   Domperidone (5mg/5ml)
*   Erythromycin (125mg/5ml) 
*   Guafenesine (100mg/5ml)
*   Ibuprofen (100mg/5ml)
*   Paracetamol (120mg/5ml)

*หมายเหตุ: รายการยาและความเข้มข้นอาจมีการเปลี่ยนแปลง โปรดตรวจสอบจากหน้าเว็บโดยตรง*

## ⚠️ คำเตือนที่สำคัญ (Important Disclaimer)

**โปรแกรมนี้เป็นเพียงเครื่องมือช่วยคำนวณเบื้องต้นสำหรับบุคลากรทางการแพทย์เท่านั้น**

*   ข้อมูลที่ได้จากการคำนวณ **ไม่สามารถ** ใช้แทนวิจารณญาณทางการแพทย์ (Clinical Judgment) ได้
*   ผู้ใช้งานต้องมีความรู้ความเข้าใจเกี่ยวกับยาแต่ละชนิด และต้องทวนสอบความถูกต้องของขนาดยาให้เหมาะสมกับผู้ป่วยแต่ละรายเสมอ โดยพิจารณาจากสภาวะของผู้ป่วย, การทำงานของตับ/ไต, และข้อบ่งใช้อื่นๆ
*   **ห้าม** ผู้ป่วยหรือบุคคลทั่วไปใช้โปรแกรมนี้เพื่อปรับขนาดยาด้วยตนเองโดยเด็ดขาด
*   ผู้พัฒนาไม่รับผิดชอบต่อความเสียหายใดๆ ที่อาจเกิดขึ้นจากการใช้โปรแกรมนี้

## 👨‍💻 สำหรับนักพัฒนา (For Developers)

หากคุณสนใจที่จะช่วยพัฒนาโปรเจกต์นี้ สามารถทำตามขั้นตอนต่อไปนี้ได้

### การติดตั้งและรันโปรเจกต์ในเครื่อง (Local Setup)

โปรเจกต์นี้เป็น Static Web App (HTML, CSS, JavaScript) จึงไม่ต้องมีการ build ที่ซับซ้อน

1.  Clone a copy of the repo:
    ```bash
    git clone https://github.com/suradet-ps/peddi-dose.git
    ```
2.  เข้าไปที่โฟลเดอร์โปรเจกต์:
    ```bash
    cd peddi-dose
    ```
3.  เปิดไฟล์ `index.html` ด้วยเว็บเบราว์เซอร์ของคุณ

### โครงสร้างไฟล์ (File Structure)

*   `index.html`: โครงสร้างหลักของหน้าเว็บ
*   `style.css`: สไตล์ชีตสำหรับหน้าตาของเว็บ (รวมถึง Dark/Light Mode)
*   `script.js`: **หัวใจหลักของโปรแกรม** ประกอบด้วย
    *   ฟังก์ชัน `calculate()`: ตรรกะการคำนวณทั้งหมด
    *   ฟังก์ชัน `getDrugInfo()`: ฐานข้อมูลยา, ขนาดยา, ความเข้มข้น, และคำเตือนต่างๆ

### การมีส่วนร่วม (Contributing)

1.  **Fork** the repository.
2.  สร้าง Branch ใหม่สำหรับฟีเจอร์ของคุณ (`git checkout -b feature/AmazingFeature`).
3.  Commit การเปลี่ยนแปลงของคุณ (`git commit -m 'Add some AmazingFeature'`).
4.  Push ไปยัง Branch (`git push origin feature/AmazingFeature`).
5.  เปิด **Pull Request**.
