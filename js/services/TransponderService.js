class TransponderService {

    static getTransponderById(transponderId) {
        return TransponderRepository.findById(transponderId);
    }

    static filterTransponderBySearchString(stringValue) {
        return this.filterTransponderBySearchValue(TransponderRepository.getAll(), stringValue);
    }

    static filterTransponderBySearchValue(transponderlist, searchValue) {
        var filterOn = !(searchValue == null || searchValue == "");
        var selectedTransponder = [];
        for (var i = 0; i < transponderlist.length; ++i) {
            if (filterOn == true) {
                if (transponderlist[i].no.search(new RegExp(searchValue, 'i')) != -1) 
                {
                    selectedTransponder.push(transponderlist[i]);
                }
            } else {
                selectedTransponder.push(transponderlist[i]);
            }
        }
        
        return selectedTransponder;
    }
}