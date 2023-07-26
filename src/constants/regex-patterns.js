module.exports = {
  POSTCODE_REGEX: /^(?![QVX])[A-Z]((?![IJZ])[A-Z][0-9](([0-9]?)|([ABEHMNPRVWXY]?))|([0-9]([0-9]?|[ABCDEFGHJKPSTUW]?))) ?[0-9]((?![CIKMOV])[A-Z]){2}$|^(BFPO)[ ]?[0-9]{1,4}$/i,
  NINO_REGEX: /^(?!BG|GB|NK|KN|TN|NT|ZZ)[ABCEGHJ-PRSTW-Z][ABCEGHJ-NPRSTW-Z]\d{6}[A-D]$/i,
  TELEPHONE_REGEX: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$/g,
};
