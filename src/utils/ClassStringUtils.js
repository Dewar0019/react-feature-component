module.exports = {
  convertToStyleName(toConvert) {
    return toConvert.replace(/[,_\s]/g, "-", "-").toLowerCase();
  },

  isAvailableStyleName(presence) {
    return presence ? 'available' : 'unavailable';
  }
};
