const fs = require('fs');
const path = require('path');

 const getFilePath = ( filename) =>{
  return path.join(process.cwd(),'public',   `${filename}.json`);
}
// Helper function to read the JSON file
const readJsonFile = (filename) => {
  const filePath = getFilePath(filename)

  try {
    if (!fs.existsSync(filePath)) {
      // Initialize file if it doesn't exist
      fs.writeFileSync(filePath, JSON.stringify([], null, 2), 'utf8');
    }

    const data = fs.readFileSync(filePath, 'utf8');
    // If file is empty, return an empty array
    if (!data) {
      return [];
    }

    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading JSON file:', error);
    throw new Error('Failed to read JSON file');
  }
};

// Helper function to write to the JSON file
const writeJsonFile = (data,filename) => {
  const filePath = getFilePath(filename)
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};

// 1. Create a new entry
const createEntry = (newEntry,filename) => {
  const data = readJsonFile(filename);
  data.push(newEntry);
  writeJsonFile(data,filename);
  return { message: 'Entry created successfully', newEntry };
};

// 2. Read all entries
const readEntries = (filename) => {
  return readJsonFile(filename);
};

// 3. Update an entry by ID
const updateEntry = (uniqId, updatedFields) => {
  const data = readJsonFile();
  const entryIndex = data.findIndex(entry => entry.uniqId === uniqId);

  if (entryIndex === -1) {
    throw new Error('Entry not found');
  }

  data[entryIndex] = { ...data[entryIndex], ...updatedFields };
  writeJsonFile(data);
  return {
    message: 'Entry updated successfully',
    updatedEntry: data[entryIndex],
  };
};
const blankEntry = (filename) => {
  console.log('blankEntry',filename)
  writeJsonFile([],filename);
  return {
    message: 'Entry blanked successfully',
  };
};

// 4. Delete an entry by ID
const deleteEntry = (uniqId,filename) => {
  const data = readJsonFile(filename);
  const filteredData = data.filter(entry => entry.uniqId !== uniqId);

  if (data.length === filteredData.length) {
    throw new Error('Entry not found');
  }

  writeJsonFile(filteredData,filename);
  return { message: 'Entry deleted successfully' };
};

const watchFile = (filename,action) =>{
    // Watch the activeTrade.json file for changes
  const filePath =   getFilePath(filename)
  const dat = readEntries(filename)
  fs.watch(filePath, (eventType, filename) => {
    if (eventType === "change") {
      console.log(dat,dat.length)
      console.log(`${filename} has been updated.`);
      action()
    }
  });
}

const emitTradeRecord = (filename,eventName='-',action) =>{
  const tradeFilePath =  getFilePath(filename);
  fs.watch(tradeFilePath, (eventType) => {
    if (eventType === "change") {
    fs.readFile(tradeFilePath, 'utf-8', (err, data) => {
      if (err) {
        console.error('Error reading the file:', err);
        return;
      }

      try {
        const updatedContent = JSON.parse(data); // Parse JSON content if necessary
        // io.emit(eventName, updatedContent);
        action.emit(eventName, updatedContent)

      } catch (parseError) {
        console.error('Error parsing the file content:', parseError);
      }
    });
    }
  });
}

const emitInitialTradeRecord = (filename,eventName='-',action,senderId) =>{
  // action.in(senderId).emit('getInitialData', `data.data`);
  const tradeFilePath =  getFilePath(filename);

  console.log('st1')
    fs.readFile(tradeFilePath, 'utf-8', (err, data) => {
      if (err) {
        console.error('Error reading the file:', err);
        return;
      }

      try {
        const updatedContent = JSON.parse(data); // Parse JSON content if necessary
        console.log('Updated file content:', updatedContent.length);
        action.in(senderId).emit(eventName, updatedContent);
        // io.emit(eventName, updatedContent);
        // action.emit(eventName, updatedContent)
        // action.in(senderId).emit('getInitialData', updatedContent);

      } catch (parseError) {
        console.error('Error parsing the file content:', parseError);
      }
    });
}

module.exports = {blankEntry,emitInitialTradeRecord,emitTradeRecord, getFilePath,createEntry, readEntries, updateEntry, deleteEntry,watchFile };
