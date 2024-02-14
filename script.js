function resume(outputFileName, jsonFile) {
  const fs = require('fs');
  const pdf = require('pdfkit');

  const file = fs.readFileSync(jsonFile, 'utf-8');
  const parsedData = JSON.parse(file);

  const write_file = fs.createWriteStream(outputFileName);

  const doc = new pdf();
  doc.pipe(write_file);

  parsedData.personal_info.forEach((personal_info, index) => {
    doc.font('Helvetica-Bold').fontSize(18).text(personal_info.name, { align: 'center' });
    doc.text(personal_info.address, { align: 'center' });
    doc.text(personal_info.phone + ' | ' + personal_info.email, { align: 'center' });
    doc.text('\n')
  });

  doc.font('Helvetica-Bold').fontSize(14).text(parsedData.brief_description, { align: 'center' });

  doc.font('Helvetica-Bold').fontSize(16).text('Professional Experience\n');

  parsedData.experiences.forEach((experiences, index) => {
    doc.font('Helvetica-Bold').fontSize(14).text(experiences.company + ' | ' + experiences.postion + ' | ' + experiences.work_year);
    doc.text('Company_logo: ' + " " + experiences.company_logo);
    doc.text('Duties:' + " " + experiences.duties);
    doc.text('\n');
  });

  doc.font('Helvetica-Bold').fontSize(16).text('\n' + 'Education' + '\n');
  parsedData.education.forEach((education, index) => {
    doc.font('Helvetica-Bold').fontSize(14).text(education.school_name + ' | ' + education.year);
    doc.text('Level: ' + " " + education.level);
    doc.text('Title:' + " " + education.title);
    doc.text('\n');
  });
  doc.font('Helvetica-Bold').fontSize(16).text('Skills:\n');
  doc.font('Helvetica-Bold').fontSize(14).text(parsedData.skills.join('   '));
  doc.end();
}

module.exports = { resume };