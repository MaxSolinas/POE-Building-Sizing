;(function() {
    const LOGO_BASE64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAAAyCAYAAACgRR8ZAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABNSURBVHgB7c6xCQAgDAVBE4t0/4VbiGAhGxt5b8D/4xERM6097vp5sFhYLEwsFhYTC4uFxcLiYGFxsLBYWCwsFhYLC4uFxcLiYGGx/LEXz00D1e3e7WAAAAAASUVORK5CYII=";

    const CONTACT_INFO = {
        address: "296 Rte de Longwy, L-1940 Merl-Luxembourg",
        phone: "Tél : +352 20 33 80 01",
        web: "www.aquapurify.lu",
        email: "hello@aquapurify.lu"
    };

    const CONFIG = {
        containerId: 'wyws-dealer-widget',
        apiUrl: 'https://download.data.public.lu/resources/durete-de-leau/20251211-020257/wasserharte.geojson',
        linkCollectif: '/contactus',
        websiteLink: 'https://www.aquapurify.lu'
    };

    const VR_PER_APT = 0.72; // l/s

    const PRODUCT_DB = [
        { limit: 2.0, name: "Kinetico S150 XP / 2030s", maxSelectTH: 35, volLimit: 0.5, resin: "26.6 L (2 x 13.3 L)", flow1b: "2.0 m³/h", flow2b: "3.4 m³/h", hardness: "68°f", conn: "1\"", dims: "1041 x 381 x 178 mm", pressure: "1.7 - 8.6 bar (dyn)", temp: "2 - 49° C" },
        { limit: 2.6, name: "Kinetico S250 XP / 2060s", maxSelectTH: 40, volLimit: 0.8, resin: "39.6 L (2 x 19.8 L)", flow1b: "2.6 m³/h", flow2b: "4.0 m³/h", hardness: "102°f", conn: "1\"", dims: "1168 x 432 x 203 mm", pressure: "1.7 - 8.6 bar (dyn)", temp: "2 - 49° C" },
        { limit: 4.7, name: "Kinetico S250 OD XP / 2060s OD", maxSelectTH: 25, volLimit: 1.2, resin: "39.6 L (2 x 19.8 L)", flow1b: "4.7 m³/h", flow2b: "6.8 m³/h", hardness: "49°f", conn: "1-1/4\"", dims: "1168 x 432 x 203 mm", pressure: "1.7 - 8.6 bar (dyn)", temp: "2 - 49° C" },
        { limit: 2.7, name: "Kinetico S350 XP / 2100s", maxSelectTH: 45, volLimit: 1.8, resin: "90 L (2 x 45 L)", flow1b: "2.6 m³/h", flow2b: "4.3 m³/h", hardness: "162°f", conn: "1-1/4\"", dims: "1524 x 533 x 254 mm", pressure: "1.7 - 8.6 bar (dyn)", temp: "2 - 49° C" },
        { limit: 4.8, name: "Kinetico CP210s OD / 2100s OD", maxSelectTH: 40, volLimit: 2.4, resin: "90 L (2 x 45 L)", flow1b: "4.8 m³/h", flow2b: "7.2 m³/h", hardness: "102°f", conn: "1-1/4\"", dims: "1524 x 533 x 254 mm", pressure: "1.7 - 8.6 bar (dyn)", temp: "2 - 49° C" },
        { limit: 3.7, name: "Kinetico S550 XP / 2175s", maxSelectTH: 40, volLimit: 3.2, resin: "128 L (2 x 64 L)", flow1b: "2.8 m³/h", flow2b: "5.0 m³/h", hardness: "256°f", conn: "1-1/4\"", dims: "1524 x 686 x 330 mm", pressure: "1.7 - 8.6 bar (dyn)", temp: "2 - 49° C" },
        { limit: 6.4, name: "KineticoPRO CP213s OD", maxSelectTH: 35, volLimit: 6.0, resin: "142 L (2 x 71 L)", flow1b: "6.4 m³/h", flow2b: "9.0 m³/h", hardness: "87°f", conn: "1-1/4\"", dims: "1524 x 686 x 330 mm", pressure: "1.7 - 8.6 bar (dyn)", temp: "2 - 49° C" },
        { limit: 8.0, name: "KineticoPRO CP216s OD", maxSelectTH: 35, volLimit: 7.5, resin: "226 L (2 x 113 L)", flow1b: "7.9 m³/h", flow2b: "10.7 m³/h", hardness: "84°f", conn: "1-1/4\"", dims: "1803 x 838 x 406 mm", pressure: "1.7 - 8.6 bar (dyn)", temp: "2 - 49° C" },
        { limit: 12.8, name: "KineticoPRO CP413s OD", maxSelectTH: 40, volLimit: 8.4, resin: "284 L (4 x 71 L)", flow1b: "12.7 m³/h", flow2b: "18.1 m³/h", hardness: "87°f", conn: "1-1/4\" (x2) / 2\"", dims: "1524 x 991 x 686 mm", pressure: "1.7 - 8.6 bar (dyn)", temp: "2 - 49° C" },
        { limit: 15.9, name: "KineticoPRO CP416s OD", maxSelectTH: 40, volLimit: 14.4, resin: "452 L (4 x 113 L)", flow1b: "15.8 m³/h", flow2b: "21.3 m³/h", hardness: "84°f", conn: "1-1/4\" (x2) / 2\"", dims: "1803 x 1219 x 838 mm", pressure: "1.7 - 8.6 bar (dyn)", temp: "2 - 49° C" },
        { limit: 19.1, name: "KineticoPRO CP613s OD", maxSelectTH: 45, volLimit: 17.0, resin: "420 L (6 x 70 L)", flow1b: "19.0 m³/h", flow2b: "27.2 m³/h", hardness: "87°f", conn: "1-1/4\" (x3) / 2-1/2\"", dims: "1524 x 1651 x 686 mm", pressure: "1.7 - 8.6 bar (dyn)", temp: "2 - 49° C" },
        { limit: 23.8, name: "KineticoPRO CP616s OD", maxSelectTH: 45, volLimit: 28.8, resin: "678 L (6 x 113 L)", flow1b: "23.8 m³/h", flow2b: "32.0 m³/h", hardness: "84°f", conn: "1-1/4\" (x3) / 2-1/2\"", dims: "1803 x 2032 x 838 mm", pressure: "1.7 - 8.6 bar (dyn)", temp: "2 - 49° C" },
        { limit: 15.5, name: "KineticoPRO CP813s OD", maxSelectTH: 50, volLimit: 22.6, resin: "560 L (8 x 70 L)", flow1b: "25.4 m³/h", flow2b: "36.3 m³/h", hardness: "87°f", conn: "1-1/4\" (x4) / 3\"", dims: "1524 x 2311 x 686 mm", pressure: "1.7 - 8.6 bar (dyn)", temp: "2 - 49° C" },
        { limit: 31.8, name: "KineticoPRO CP816s OD", maxSelectTH: 50, volLimit: 38.4, resin: "904 L (8 x 113 L)", flow1b: "31.8 m³/h", flow2b: "42.7 m³/h", hardness: "84°f", conn: "1-1/4\" (x4) / 3\"", dims: "1900 x 750 x 850 mm", pressure: "1.7 - 8.6 bar (dyn)", temp: "2 - 49° C" }
    ];

    const MASTER_DATA = {
        "Beggen": { th: 27.9, city: "Luxembourg" }, "Belair": { th: 28.8, city: "Luxembourg" },
        "Belair-Nord": { th: 28.8, city: "Luxembourg" }, "Bonnevoie-Nord": { th: 32.0, city: "Luxembourg" },
        "Verlorenkost": { th: 32.0, city: "Luxembourg" }, "Cents": { th: 27.4, city: "Luxembourg" },
        "Cessange": { th: 28.8, city: "Luxembourg" }, "Clausen": { th: 27.9, city: "Luxembourg" },
        "Dommeldange": { th: 27.9, city: "Luxembourg" }, "Eich": { th: 26.3, city: "Luxembourg" },
        "Gare": { th: 32.0, city: "Luxembourg" }, "Gasperich": { th: 23.1, city: "Luxembourg" },
        "Grund": { th: 27.4, city: "Luxembourg" }, "Hamm": { th: 27.4, city: "Luxembourg" },
        "Hollerich": { th: 31.9, city: "Luxembourg" }, "Kirchberg": { th: 27.4, city: "Luxembourg" },
        "Limpertsberg": { th: 30.1, city: "Luxembourg" }, "Merl": { th: 31.9, city: "Luxembourg" },
        "Muhlenbach": { th: 26.3, city: "Luxembourg" }, "Neudorf": { th: 27.4, city: "Luxembourg" },
        "Weimershof": { th: 27.4, city: "Luxembourg" }, "Pfaffenthal": { th: 27.9, city: "Luxembourg" },
        "Pulvermuhl": { th: 32.0, city: "Luxembourg" }, "Rollingergrund": { th: 28.8, city: "Luxembourg" },
        "Ville-Haute": { th: 28.8, city: "Luxembourg" }, "Weimerskirch": { th: 27.4, city: "Luxembourg" },
        "Beaufort": { th: 33, localities: ["Beaufort", "Dillingen"] },
        "Bech": { th: 31, localities: ["Bech", "Altrier", "Blumenthal", "Geyershof", "Graulinster", "Hemstal", "Hersberg", "Rippig", "Zittig"] },
        "Beckerich": { th: 19, localities: ["Beckerich", "Elvange", "Hovelange", "Huttange", "Levelange", "Noerdange", "Oberpallen", "Schweich"] },
        "Berdorf": { th: 33, localities: ["Berdorf", "Bollendorf-Pont", "Grundhof", "Kalkesbach", "Weilerbach"] },
        "Bertrange": { th: 26, localities: ["Bertrange"] },
        "Bettembourg": { th: 35, localities: ["Bettembourg", "Abweiler", "Fennange", "Huncherange", "Noertzange"] },
        "Bettendorf": { th: 21, localities: ["Bettendorf", "Gilsdorf", "Moestroff"] },
        "Betzdorf": { th: 30, localities: ["Betzdorf", "Berg", "Mensdorf", "Olingen", "Roodt-sur-Syre"] },
        "Bissen": { th: 20, localities: ["Bissen"] },
        "Biwer": { th: 29, localities: ["Biwer", "Biwerbach", "Boudler", "Boudlerbach", "Brouch", "Hagelsdorf", "Wecker", "Weydig"] },
        "Boulaide": { th: 16, localities: ["Boulaide", "Baschleiden", "Surré"] },
        "Bourscheid": { th: 19, localities: ["Bourscheid", "Goebelsmuehle", "Kehmen", "Lipperscheid", "Michelau", "Scheidel", "Schlindermanderscheid", "Welscheid"] },
        "Bous": { th: 31, localities: ["Bous", "Assel", "Erpeldange", "Rolling"] },
        "Clervaux": { th: 18, localities: ["Clervaux", "Drauffelt", "Eselborn", "Fischbach", "Grindhausen", "Heinerscheid", "Hupperdange", "Kalborn", "Lieler", "Marnach", "Munshausen", "Reuler", "Roder", "Siebenaler", "Urspelt", "Weicherdange"] },
        "Colmar-Berg": { th: 20, localities: ["Colmar-Berg"] },
        "Consdorf": { th: 34, localities: ["Consdorf", "Breidweiler", "Colbette", "Marscherwald", "Scheidgen"] },
        "Contern": { th: 26, localities: ["Contern", "Medingen", "Moutfort", "Oetrange"] },
        "Dalheim": { th: 32, localities: ["Dalheim", "Filsdorf", "Welfrange"] },
        "Diekirch": { th: 20, localities: ["Diekirch"] },
        "Differdange": { th: 36, localities: ["Differdange", "Lasauvage", "Niederkorn", "Oberkorn"] },
        "Dippach": { th: 33, localities: ["Dippach", "Bettange-sur-Mess", "Schouweiler", "Sprinkange"] },
        "Dudelange": { th: 35, localities: ["Dudelange"] },
        "Echternach": { th: 30, localities: ["Echternach"] },
        "Ell": { th: 21, localities: ["Ell", "Colpach-Bas", "Colpach-Haut", "Petit-Nobressart", "Roodt"] },
        "Erpeldange-sur-Sûre": { th: 20, localities: ["Erpeldange-sur-Sûre", "Burden", "Ingeldorf"] },
        "Esch-sur-Alzette": { th: 35, localities: ["Esch-sur-Alzette"] },
        "Esch-sur-Sûre": { th: 14, localities: ["Esch-sur-Sûre", "Eschdorf", "Heiderscheid", "Heiderscheidergrund", "Hierheck", "Merscheid", "Ringel", "Tadler"] },
        "Ettelbruck": { th: 20, localities: ["Ettelbruck", "Warken"] },
        "Feulen": { th: 20, localities: ["Niederfeulen", "Oberfeulen"] },
        "Fischbach": { th: 20, localities: ["Fischbach", "Angelsberg", "Koedange", "Schoos", "Stuppicht", "Weyer"] },
        "Flaxweiler": { th: 30, localities: ["Flaxweiler", "Beyren", "Gostingen", "Niederdonven", "Oberdonven"] },
        "Frisange": { th: 33, localities: ["Frisange", "Aspelt", "Hellange"] },
        "Garnich": { th: 32, localities: ["Garnich", "Dahlem", "Hivange", "Kahler"] },
        "Goesdorf": { th: 19, localities: ["Goesdorf", "Bockholtz", "Buderscheid", "Dahl", "Dirbach", "Masseler", "Nocher", "Nocher-Route"] },
        "Grevenmacher": { th: 33, localities: ["Grevenmacher"] },
        "Grosbous": { th: 20, localities: ["Grosbous", "Dellen"] },
        "Heffingen": { th: 28, localities: ["Heffingen", "Reuland"] },
        "Helperknapp": { th: 20, localities: ["Boevange-sur-Attert", "Ansembourg", "Bill", "Bour", "Brouch", "Buschdorf", "Finsterthal", "Grevenknapp", "Hollenfels", "Marienthal", "Openthalt", "Tuntange"] },
        "Hesperange": { th: 33, localities: ["Hesperange", "Alzingen", "Fentange", "Howald", "Itzig"] },
        "Habscht": { th: 32, localities: ["Hobscheid", "Eischen", "Greisch", "Roodt-sur-Eisch", "Septfontaines"] },
        "Junglinster": { th: 29, localities: ["Junglinster", "Altlinster", "Beidweiler", "Blumenthal", "Bourglinster", "Eisenborn", "Eschweiler", "Godbrange", "Gonderange", "Graulinster", "Imbringen", "Rodenbourg"] },
        "Käerjeng": { th: 35, localities: ["Bascharage", "Clemency", "Fingig", "Hautcharage", "Linger"] },
        "Kayl": { th: 35, localities: ["Kayl", "Tétange"] },
        "Kehlen": { th: 32, localities: ["Kehlen", "Dondelange", "Keispelt", "Meispelt", "Nospelt", "Olm"] },
        "Kiischpelt": { th: 19, localities: ["Kautenbach", "Alscheid", "Enscherange", "Lellingen", "Merkholtz", "Pintsch", "Wilwerwiltz"] },
        "Koerich": { th: 32, localities: ["Koerich", "Goeblange", "Goetzingen", "Windhof"] },
        "Kopstal": { th: 32, localities: ["Kopstal", "Bridel"] },
        "Lac de la Haute-Sûre": { th: 15, localities: ["Bavigne", "Harlange", "Kaundorf", "Liefrange", "Mecher", "Nothum", "Tarchamps", "Watrange"] },
        "Larochette": { th: 28, localities: ["Larochette", "Ernzen"] },
        "Lenningen": { th: 31, localities: ["Lenningen", "Canach"] },
        "Leudelange": { th: 32, localities: ["Leudelange"] },
        "Lintgen": { th: 20, localities: ["Lintgen", "Gosseldange", "Prettingen"] },
        "Lorentzweiler": { th: 20, localities: ["Lorentzweiler", "Blaschette", "Bofferdange", "Helmdange", "Hunsdorf"] },
        "Mamer": { th: 32, localities: ["Mamer", "Capellen", "Holzem"] },
        "Manternach": { th: 30, localities: ["Manternach", "Berbourg", "Lellig", "Munschecker"] },
        "Mersch": { th: 21, localities: ["Mersch", "Beringen", "Berschbach", "Moesdorf", "Pettingen", "Reckange", "Rollingen", "Schoenfels"] },
        "Mertert": { th: 31, localities: ["Mertert", "Wasserbillig"] },
        "Mertzig": { th: 19, localities: ["Mertzig"] },
        "Mondercange": { th: 34, localities: ["Mondercange", "Bergem", "Foetz", "Pontpierre"] },
        "Mondorf-les-Bains": { th: 33, localities: ["Mondorf-les-Bains", "Altwies", "Ellange"] },
        "Niederanven": { th: 26, localities: ["Niederanven", "Ernster", "Hostert", "Oberanven", "Rameldange", "Senningen", "Senningerberg", "Waldhof"] },
        "Nommern": { th: 28, localities: ["Nommern", "Cruchten", "Schrondweiler"] },
        "Parc Hosingen": { th: 19, localities: ["Hosingen", "Bockholtz", "Consthum", "Dorscheid", "Holzthum", "Hoscheid", "Hoscheid-Dickt", "Neidhausen", "Oberschlinder", "Rodershausen", "Unterschlinder", "Wahlhausen"] },
        "Pétange": { th: 36, localities: ["Pétange", "Lamadelaine", "Rodange"] },
        "Préizerdaul": { th: 20, localities: ["Bettborn", "Platen", "Pratz", "Reimberg"] },
        "Putscheid": { th: 19, localities: ["Putscheid", "Bivels", "Gralingen", "Merscheid", "Nachtmanderscheid", "Stolzembourg", "Weiler"] },
        "Rambrouch": { th: 20, localities: ["Rambrouch", "Arsdorf", "Bigonville", "Bilsdorf", "Eschette", "Folschette", "Haut-Martelange", "Holtz", "Hostert", "Koetschette", "Perlé", "Rombach", "Schwiedelbrouch", "Wolwelange"] },
        "Reckange-sur-Mess": { th: 33, localities: ["Reckange-sur-Mess", "Ehlange", "Limpach", "Pissange", "Roedgen", "Wickrange"] },
        "Redange-sur-Attert": { th: 20, localities: ["Redange-sur-Attert", "Eltz", "Lannen", "Nagem", "Niederpallen", "Ospern", "Reichlange"] },
        "Reisdorf": { th: 20, localities: ["Reisdorf", "Bigelbach", "Hoesdorf", "Wallendorf-Pont"] },
        "Roeser": { th: 34, localities: ["Roeser", "Berchem", "Bivange", "Crauthem", "Kockelscheuer", "Livange", "Peppange"] },
        "Rosport-Mompach": { th: 30, localities: ["Rosport", "Born", "Dickweiler", "Girst", "Girsterklaus", "Hinkel", "Mompach", "Moersdorf", "Osweiler", "Steinheim"] },
        "Rumelange": { th: 35, localities: ["Rumelange"] },
        "Saeul": { th: 20, localities: ["Saeul", "Calmus", "Ehner", "Kapweiler", "Schwebach"] },
        "Sandweiler": { th: 26, localities: ["Sandweiler"] },
        "Sanem": { th: 35, localities: ["Sanem", "Belvaux", "Ehlerange", "Soleuvre"] },
        "Schengen": { th: 33, localities: ["Schengen", "Bech-Kleinmacher", "Burmerange", "Elvange", "Emerange", "Remerschen", "Schwebsange", "Wellenstein", "Wintrange"] },
        "Schieren": { th: 20, localities: ["Schieren"] },
        "Schifflange": { th: 35, localities: ["Schifflange"] },
        "Schuttrange": { th: 26, localities: ["Schuttrange", "Munsbach", "Neuhaeusgen", "Schrassig", "Uebersyren"] },
        "Stadtbredimus": { th: 32, localities: ["Stadtbredimus", "Greiveldange"] },
        "Steinfort": { th: 32, localities: ["Steinfort", "Grass", "Hagen", "Kleinbettingen"] },
        "Steinsel": { th: 20, localities: ["Steinsel", "Heisdorf", "Mullendorf"] },
        "Strassen": { th: 32, localities: ["Strassen"] },
        "Tandel": { th: 19, localities: ["Tandel", "Bastendorf", "Bettel", "Brandenbourg", "Fouhren", "Landscheid", "Longsdorf", "Walsdorf"] },
        "Troisvierges": { th: 18, localities: ["Troisvierges", "Basbellain", "Biwisch", "Drinklange", "Goedange", "Hautbellain", "Huldange", "Wilwerdange"] },
        "Useldange": { th: 20, localities: ["Useldange", "Everlange", "Rippweiler", "Schandel"] },
        "Vallée de l'Ernz": { th: 30, localities: ["Medernach", "Eppeldorf", "Ermsdorf", "Folkendange", "Stegen"] },
        "Vianden": { th: 19, localities: ["Vianden"] },
        "Vichten": { th: 20, localities: ["Vichten", "Michelbouch"] },
        "Wahl": { th: 20, localities: ["Wahl", "Buschrodt", "Grevels", "Heispelt", "Kuborn", "Rindschleiden"] },
        "Waldbillig": { th: 31, localities: ["Waldbillig", "Christnach", "Freckeisen", "Haller"] },
        "Waldbredimus": { th: 31, localities: ["Waldbredimus", "Ersange", "Roedt", "Trintange"] },
        "Walferdange": { th: 22, localities: ["Walferdange", "Bereldange", "Helmsange"] },
        "Weiler-la-Tour": { th: 28, localities: ["Weiler-la-Tour", "Hassel", "Syren"] },
        "Weiswampach": { th: 18, localities: ["Weiswampach", "Beiler", "Binsfeld", "Breidfeld", "Holler", "Leithum"] },
        "Wiltz": { th: 19, localities: ["Wiltz", "Eschweiler", "Erpeldange", "Knaphoscheid", "Roullingen", "Selscheid", "Weidingen"] },
        "Wincrange": { th: 19, localities: ["Wincrange", "Asselborn", "Boevange", "Boxhorn", "Brachtenbach", "Deiffelt", "Derenbach", "Doennange", "Hachiville", "Hamiville", "Hoffelt", "Lullange", "Niederwampach", "Oberwampach", "Rumlange", "Sassel", "Stockem", "Troine", "Troine-Route"] },
        "Winseler": { th: 19, localities: ["Winseler", "Berlé", "Doncols", "Groumelscheid", "Noertrange", "Pommerloch", "Schleif", "Soller"] },
        "Wormeldange": { th: 32, localities: ["Wormeldange", "Ahn", "Dreiborn", "Ehnen", "Machtum"] }
    };

    const css = `
        #wyws-dealer-widget { font-family: 'Montserrat', 'Segoe UI', sans-serif; max-width: 800px; margin: 20px auto; background: #fff; border: 1px solid #e1e4e8; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); text-align: left; color: #333; }
        .kw-pro-header { padding: 20px 30px; background: #f8f9fa; border-bottom: 1px solid #eee; border-radius: 8px 8px 0 0; display: flex; justify-content: space-between; align-items: center; }
        .kw-pro-title { font-size: 1.2rem; font-weight: 800; color: #003594; text-transform: uppercase; margin: 0; }
        .kw-pro-subtitle { font-size: 0.9rem; color: #666; }
        .kw-pro-content { padding: 30px; }
        .kw-pro-search-group { position: relative; margin-bottom: 30px; }
        .kw-pro-input { width: 100%; padding: 12px 15px; border: 2px solid #ddd; border-radius: 4px; font-size: 16px; outline: none; transition: 0.3s; box-sizing: border-box; }
        .kw-pro-input:focus { border-color: #003594; }
        .kw-pro-suggestions { position: absolute; top: 100%; left: 0; right: 0; background: white; border: 1px solid #ccc; z-index: 100; max-height: 200px; overflow-y: auto; display: none; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
        .kw-pro-suggestion-item { padding: 10px 15px; cursor: pointer; border-bottom: 1px solid #f0f0f0; font-size: 14px; }
        .kw-pro-suggestion-item:hover { background: #f0f7ff; color: #003594; }
        .kw-pro-data-display { background: #eef6fc; border-left: 5px solid #003594; padding: 15px 20px; margin-bottom: 25px; display: none; }
        .kw-pro-data-row { display: flex; align-items: baseline; gap: 10px; }
        .kw-pro-data-label { font-weight: bold; color: #555; font-size: 0.9em; text-transform: uppercase; }
        .kw-pro-data-value { font-size: 1.5em; font-weight: 900; color: #003594; }
        .kw-pro-data-unit { color: #666; }
        .kw-pro-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px; }
        .kw-pro-group { display: flex; flex-direction: column; margin-bottom: 15px; }
        .kw-pro-label { font-size: 0.85rem; font-weight: 700; margin-bottom: 8px; color: #333; }
        .kw-pro-select, .kw-pro-calc-input { padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 14px; width: 100%; box-sizing: border-box; }
        .kw-pro-input-locked { background-color: #f0f0f0; color: #666; cursor: not-allowed; border: 1px solid #dcdcdc; font-family: monospace; }
        .kw-pro-btn { background: #003594; color: white; border: none; padding: 12px 25px; border-radius: 4px; font-weight: bold; cursor: pointer; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 20px; width: 100%; transition: 0.2s; }
        .kw-pro-btn:hover { background: #002a75; }
        .kw-pro-result-box { margin-top: 30px; border: 2px solid #E5007E; border-radius: 6px; overflow: hidden; display: none; }
        .kw-pro-result-header { background: #E5007E; color: white; padding: 10px 20px; font-weight: bold; text-transform: uppercase; font-size: 0.9rem; }
        .kw-pro-result-body { padding: 20px; text-align: center; background: #fff; }
        .kw-pro-model-name { font-size: 2rem; font-weight: 900; color: #333; margin: 10px 0; }
        .kw-pro-specs { display: flex; justify-content: center; gap: 30px; margin-bottom: 15px; }
        .kw-pro-spec-item { text-align: center; }
        .kw-pro-spec-val { display: block; font-size: 1.2rem; font-weight: bold; color: #003594; }
        .kw-pro-spec-label { font-size: 0.8rem; color: #777; text-transform: uppercase; }
        .kw-pro-formula { display: none !important; }
        .kw-pdf-btn { background: #fff; border: 2px solid #003594; color: #003594; padding: 10px 20px; border-radius: 4px; font-weight: bold; cursor: pointer; text-transform: uppercase; font-size: 0.85rem; margin-top: 20px; transition: 0.2s; display: inline-block; }
        .kw-pdf-btn:hover { background: #f0f7ff; }
        .kw-pro-footer { margin-top: 20px; padding: 15px 30px; border-top: 1px solid #eee; font-size: 11px; color: #999; }
    `;

    const htmlTemplate = `
        <div class="kw-pro-header">
            <div>
                <h2 class="kw-pro-title">SIMULATEUR DE DIMENSIONNEMENT</h2>
                <span class="kw-pro-subtitle">Conforme DIN 1988-300</span>
            </div>
        </div>
        <div class="kw-pro-content">
            <div class="kw-pro-group">
                <label class="kw-pro-label" style="color:#003594;">RÉFÉRENCE / NOM DU PROJET</label>
                <input type="text" id="kw-project-ref" class="kw-pro-input" placeholder="Ex: Résidence Kennedy, Lotissement B..." autocomplete="off">
            </div>
            <div class="kw-pro-search-group">
                <label class="kw-pro-label">LOCALISATION DU PROJET</label>
                <input type="text" id="kw-dealer-input" class="kw-pro-input" placeholder="Entrez la commune ou localité..." autocomplete="off">
                <div id="kw-dealer-suggestions" class="kw-pro-suggestions"></div>
            </div>
            <div id="kw-tech-data" class="kw-pro-data-display">
                <div class="kw-pro-data-row">
                    <span class="kw-pro-data-label">Dureté Réseau :</span>
                    <span class="kw-pro-data-value" id="kw-th-value">--</span>
                    <span class="kw-pro-data-unit" id="kw-th-unit">°f</span>
                    <span style="margin: 0 10px; color:#ccc;">|</span>
                    <span class="kw-pro-data-value" id="kw-th-german">--</span>
                    <span class="kw-pro-data-unit">°dH</span>
                </div>
                <div style="font-size: 0.9em; color:#666; margin-top:5px;" id="kw-commune-name"></div>
            </div>
            <div id="kw-step-project" style="display:none;">
                <div class="kw-pro-group">
                    <label class="kw-pro-label">TYPE DE BÂTIMENT</label>
                    <select id="kw-dealer-type" class="kw-pro-select">
                        <option value="" disabled selected>-- Sélectionner --</option>
                        <option value="appt">Appartement (Individuel)</option>
                        <option value="maison">Maison Unifamiliale</option>
                        <option value="collectif">Immeuble Collectif / Résidence</option>
                        <option value="pro">Commercial / Horeca</option>
                    </select>
                </div>
                <div id="kw-form-collectif" style="display:none; margin-top:25px; padding-top:20px; border-top:1px dashed #ccc;">
                    <label class="kw-pro-label" style="color:#003594;">PARAMÈTRES DE CALCUL (COLLECTIF)</label>
                    <div class="kw-pro-form-grid">
                        <div class="kw-pro-group">
                            <label class="kw-pro-label">Nombre d'unités (Apparts)</label>
                            <input type="number" id="kw-calc-apts" class="kw-pro-calc-input" min="1" placeholder="Ex: 12">
                        </div>
                        <div class="kw-pro-group">
                            <label class="kw-pro-label">ΣVR/appt (l/s) — DIN 1988-300</label>
                            <input type="text" value="0.72" class="kw-pro-calc-input kw-pro-input-locked" disabled title="Hypothèse conservative: baignoire + WC + lavabo + cuisine + lave-linge + lave-vaisselle">
                        </div>
                        <div class="kw-pro-group">
                            <label class="kw-pro-label">Consommation (L/Pers/J)</label>
                            <input type="text" value="135" class="kw-pro-calc-input kw-pro-input-locked" disabled title="Valeur fixe standardisée">
                        </div>
                        <div class="kw-pro-group">
                            <label class="kw-pro-label">Occupation (Pers/Appt)</label>
                            <input type="text" value="2" class="kw-pro-calc-input kw-pro-input-locked" disabled title="Valeur fixe standardisée">
                        </div>
                    </div>
                    <button id="kw-calc-btn" class="kw-pro-btn">Calculer le débit de pointe</button>
                </div>
            </div>
            <div id="kw-result-box" class="kw-pro-result-box">
                <div class="kw-pro-result-header">Préconisation Technique</div>
                <div class="kw-pro-result-body">
                    <div class="kw-pro-specs" id="kw-res-specs">
                        <div class="kw-pro-spec-item">
                            <span class="kw-pro-spec-val" id="kw-res-flow">--</span>
                            <span class="kw-pro-spec-label">Débit Pointe (m³/h)</span>
                        </div>
                        <div class="kw-pro-spec-item">
                            <span class="kw-pro-spec-val" id="kw-res-vol">--</span>
                            <span class="kw-pro-spec-label">Vol. Journalier (m³)</span>
                        </div>
                    </div>
                    <div style="color:#666; font-size:0.9rem; margin-top:15px;">Modèle Recommandé :</div>
                    <div id="kw-res-model" class="kw-pro-model-name"></div>
                    <div style="margin-top:20px;">
                        <button id="kw-pdf-btn" class="kw-pdf-btn">📄 Télécharger le Rapport PDF</button>
                        <br><br>
                        <a href="/contactus" style="color:#E5007E; text-decoration:underline; font-weight:bold; font-size:0.9rem;">Demander la fiche technique &amp; prix</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="kw-pro-footer">
            Outil réservé aux partenaires Aqua Purify. Calculs basés sur DIN 1988-300.<br>
            Données de dureté : Administration de la gestion de l'eau (Luxembourg).
        </div>
    `;

    function initWidget() {
        const root = document.getElementById(CONFIG.containerId);
        if (!root) return;
        const styleTag = document.createElement('style');
        styleTag.textContent = css;
        document.head.appendChild(styleTag);
        root.innerHTML = htmlTemplate;

        const projRefInput = document.getElementById('kw-project-ref');
        const input = document.getElementById('kw-dealer-input');
        const suggestions = document.getElementById('kw-dealer-suggestions');
        const techDisplay = document.getElementById('kw-tech-data');
        const thValueDisp = document.getElementById('kw-th-value');
        const thGermanDisp = document.getElementById('kw-th-german');
        const communeDisp = document.getElementById('kw-commune-name');
        const stepProject = document.getElementById('kw-step-project');
        const typeSelect = document.getElementById('kw-dealer-type');
        const formCollectif = document.getElementById('kw-form-collectif');
        const btnCalc = document.getElementById('kw-calc-btn');
        const resBox = document.getElementById('kw-result-box');
        const resModel = document.getElementById('kw-res-model');
        const resFlow = document.getElementById('kw-res-flow');
        const resVol = document.getElementById('kw-res-vol');
        const resSpecs = document.getElementById('kw-res-specs');
        const btnPdf = document.getElementById('kw-pdf-btn');

        let searchIndex = [];
        let currentTH = 0;
        let selectedCommuneName = "";
        let currentResult = { model: "", flow: 0, vol: 0, type: "", apts: 0, specs: null, coefA: 0, coefB: 0, coefC: 0, vrPerApt: VR_PER_APT };

        function generateReportID() {
            const now = new Date();
            const yyyy = now.getFullYear();
            const mm = String(now.getMonth() + 1).padStart(2, '0');
            const dd = String(now.getDate()).padStart(2, '0');
            return `${yyyy}${mm}${dd}-${Math.floor(Math.random() * 90 + 10)}`;
        }

        function getModelSpecs(flowM3H, volM3) {
            const match = PRODUCT_DB.find(p => {
                const flowOk = p.limit >= flowM3H;
                let hardnessOk = true;
                if (p.maxSelectTH !== undefined && currentTH > p.maxSelectTH) hardnessOk = false;
                let volOk = true;
                if (p.volLimit !== undefined && volM3 !== undefined && volM3 > p.volLimit) volOk = false;
                return flowOk && hardnessOk && volOk;
            });
            if (match) return match;
            return { name: "KineticoPRO Hydrus sur mesure", volLimit: 0, resin: "Sur étude", flow1b: "-", flow2b: "-", hardness: "-", conn: "-", dims: "-", pressure: "-", temp: "-" };
        }

        function buildSearchIndex() {
            searchIndex = [];
            Object.entries(MASTER_DATA).forEach(([commune, data]) => {
                if (data.city === "Luxembourg") {
                    searchIndex.push({ displayName: `${commune} (Luxembourg)`, searchName: `${commune.toLowerCase()} luxembourg`, commune, th: data.th });
                    searchIndex.push({ displayName: `Luxembourg (${commune})`, searchName: `luxembourg ${commune.toLowerCase()}`, commune, th: data.th });
                } else {
                    searchIndex.push({ displayName: commune, searchName: commune.toLowerCase(), commune, th: data.th });
                    if (data.localities) {
                        data.localities.forEach(loc => {
                            if (loc.toLowerCase() !== commune.toLowerCase()) {
                                searchIndex.push({ displayName: loc, searchName: loc.toLowerCase(), commune, th: data.th });
                            }
                        });
                    }
                }
            });
            searchIndex.sort((a, b) => a.displayName.localeCompare(b.displayName, 'fr'));
        }

        async function loadData() {
            buildSearchIndex();
            try {
                const response = await fetch(CONFIG.apiUrl);
                if (!response.ok) return;
                const geoData = await response.json();
                if (geoData.features) {
                    const props = geoData.features[0].properties;
                    const keys = Object.keys(props);
                    const keyName = keys.find(k => k.toLowerCase().includes('commune'));
                    const keyVal = keys.find(k => k.toLowerCase().includes('wsz') || k.toLowerCase().includes('durete'));
                    if (keyName && keyVal) {
                        const lookup = {};
                        Object.keys(MASTER_DATA).forEach(k => lookup[k.toLowerCase().trim()] = k);
                        let updates = 0;
                        geoData.features.forEach(f => {
                            const n = f.properties[keyName];
                            const v = f.properties[keyVal];
                            if (n && typeof n === 'string') {
                                const clean = n.trim().toLowerCase();
                                const realKey = lookup[clean];
                                const val = parseFloat(v);
                                if (realKey && MASTER_DATA[realKey] && !isNaN(val) && val > 0.1) {
                                    MASTER_DATA[realKey].th = Math.max(MASTER_DATA[realKey].th, val);
                                    updates++;
                                }
                            }
                        });
                        if (updates > 0) buildSearchIndex();
                    }
                }
            } catch (e) { console.warn("Erreur chargement données GeoJSON", e); }
        }

        input.addEventListener('input', (e) => {
            const val = e.target.value.toLowerCase();
            if (val.length < 2) { suggestions.style.display = 'none'; return; }
            const matches = searchIndex.filter(i => i.searchName.includes(val)).slice(0, 10);
            suggestions.innerHTML = '';
            if (!matches.length) { suggestions.style.display = 'none'; return; }
            matches.forEach(item => {
                const div = document.createElement('div');
                div.className = 'kw-pro-suggestion-item';
                div.textContent = item.displayName;
                div.onclick = () => { input.value = item.displayName; suggestions.style.display = 'none'; selectCommune(item); };
                suggestions.appendChild(div);
            });
            suggestions.style.display = 'block';
        });

        document.addEventListener('click', (e) => {
            if (!input.contains(e.target) && !suggestions.contains(e.target)) suggestions.style.display = 'none';
        });

        function selectCommune(item) {
            currentTH = item.th;
            selectedCommuneName = item.displayName;
            thValueDisp.textContent = currentTH.toFixed(1);
            thGermanDisp.textContent = (currentTH * 0.56).toFixed(1);
            communeDisp.textContent = "Zone : " + item.displayName;
            techDisplay.style.display = 'block';
            stepProject.style.display = 'block';
            typeSelect.value = "";
            formCollectif.style.display = 'none';
            resBox.style.display = 'none';
        }

        typeSelect.addEventListener('change', function () {
            const type = this.value;
            formCollectif.style.display = 'none';
            resBox.style.display = 'none';
            currentResult.type = type;
            if (type === 'collectif') {
                formCollectif.style.display = 'block';
            } else if (type) {
                let modelName = "";
                if (type === 'appt') modelName = (currentTH <= 40) ? "Kinetico Premier Compact XP" : "Kinetico Premier Plus XP";
                if (type === 'maison') modelName = "Kinetico Premier Plus XP";
                if (type === 'pro') modelName = "Gamme Pro (Contactez-nous)";
                resModel.textContent = modelName;
                resSpecs.style.display = 'none';
                resBox.style.display = 'block';
                currentResult.model = modelName;
                currentResult.flow = 0;
                currentResult.vol = 0;
            }
        });

        btnCalc.addEventListener('click', function () {
            const apts = parseFloat(document.getElementById('kw-calc-apts').value);
            if (!apts || apts < 1) { alert("Veuillez entrer un nombre d'appartements valide."); return; }

            const ppl = 2;
            const vol = 135;
            const totalVolM3 = (apts * ppl * vol) / 1000;

            const coefA = 1.48;
            const coefB = 0.19;
            const coefC = 0.94;
            const sigmaVR = apts * VR_PER_APT; 

            const peakFlowLS = coefA * Math.pow(sigmaVR, coefB) - coefC;
            const peakFlowM3H = peakFlowLS * 3.6;

            const specs = getModelSpecs(peakFlowM3H, totalVolM3);
            resModel.textContent = specs.name;
            resFlow.textContent = peakFlowM3H.toFixed(2);
            resVol.textContent = totalVolM3.toFixed(2);

            resSpecs.style.display = 'flex';
            resBox.style.display = 'block';

            currentResult.model = specs.name;
            currentResult.flow = peakFlowM3H.toFixed(2);
            currentResult.vol = totalVolM3.toFixed(2);
            currentResult.apts = apts;
            currentResult.specs = specs;
            currentResult.coefA = coefA;
            currentResult.coefB = coefB;
            currentResult.coefC = coefC;
            currentResult.sigmaVR = sigmaVR.toFixed(2);
            currentResult.vrPerApt = VR_PER_APT;
        });

        function drawRichText(doc, x, y, parts) {
            let cursorX = x;
            parts.forEach(part => {
                doc.setFont(part.font || "helvetica", part.style || "normal");
                doc.text(part.text, cursorX, y);
                cursorX += doc.getTextWidth(part.text);
            });
            return cursorX;
        }

        btnPdf.addEventListener('click', function () {
            const { jsPDF } = window.jspdf;
            if (!jsPDF) { alert("Erreur chargement librairie PDF"); return; }
            const doc = new jsPDF();
            const now = new Date();
            const dateStr = now.toLocaleDateString('fr-FR');
            const reportID = generateReportID();
            const projName = projRefInput.value || "Non spécifié";

            try { doc.addImage(LOGO_BASE64, 'PNG', 20, 15, 43, 20); }
            catch (e) { doc.text("AQUA PURIFY", 20, 25); }

            doc.setFontSize(8); doc.setTextColor(100);
            doc.text(CONTACT_INFO.address, 20, 40);
            doc.text(CONTACT_INFO.phone, 20, 44);
            doc.text(CONTACT_INFO.web + " | " + CONTACT_INFO.email, 20, 48);

            doc.setFontSize(10); doc.setTextColor(100);
            doc.text(`Rapport N° : ${reportID}`, 140, 20);
            doc.text(`Date : ${dateStr}`, 140, 26);

            doc.setDrawColor(0, 53, 148); doc.setLineWidth(0.5);
            doc.line(20, 52, 190, 52);

            doc.setFontSize(14); doc.setTextColor(0, 53, 148);
            doc.text("1. Identification du Projet", 20, 65);
            doc.setFontSize(11); doc.setTextColor(0);
            doc.text(`Référence : ${projName}`, 25, 73);
            doc.text(`Localisation : ${selectedCommuneName}`, 25, 80);
            doc.text(`Dureté (TH) : ${currentTH.toFixed(1)}°f   /   ${(currentTH * 0.56).toFixed(1)}°dH`, 25, 87);

            doc.setFontSize(14); doc.setTextColor(0, 53, 148);
            doc.text("2. Données Techniques de Dimensionnement", 20, 105);

            const rowHeight = 7;
            const col1X = 25, col2X = 85;
            let currentY = 112;
            doc.setFontSize(10); doc.setTextColor(50); doc.setDrawColor(220);

            let tableRows = [];
            if (currentResult.type === 'collectif') {
                tableRows = [
                    { l: "Type de bâtiment", v: "Immeuble Collectif" },
                    { l: "Nombre d'unités", v: `${currentResult.apts} appartements` },
                    { l: "Hypothèses occupation", v: "2 Pers/Appt | 135 L/Pers/J" },
                    { l: "Volume Journalier Estimé", v: `${currentResult.vol} m3` },
                    { l: "Base de calcul", v: "Norme DIN 1988-300" },
                    { 
                        richL: [
                            { text: "S", font: "Symbol" }, 
                            { text: "VR/appt (hypothèse)", font: "helvetica" }
                        ], 
                        v: `${currentResult.vrPerApt} l/s (bain+WC+lavabo+cuisine+LM+LV)` 
                    },
                    { 
                        richL: [
                            { text: "S", font: "Symbol" }, 
                            { text: "VR total", font: "helvetica" }
                        ], 
                        v: `${currentResult.sigmaVR} l/s` 
                    },
                    {
                        l: "Formule",
                        richV: [
                            { text: "Vs = " + currentResult.coefA + " * (", font: "helvetica" },
                            { text: "S", font: "Symbol" },
                            { text: "VR)^" + currentResult.coefB + " - " + currentResult.coefC, font: "helvetica" }
                        ]
                    },
                    { l: "Application", v: `Vs = ${currentResult.coefA} * (${currentResult.sigmaVR})^${currentResult.coefB} - ${currentResult.coefC}` },
                    { l: "Débit de Pointe Calculé", v: `${currentResult.flow} m3/h`, bold: true }
                ];
            } else {
                tableRows = [{ l: "Type de bâtiment", v: currentResult.type === 'maison' ? 'Maison Unifamiliale' : 'Appartement' }];
            }

            tableRows.forEach((row, index) => {
                if (index > 0) doc.line(20, currentY - 5, 190, currentY - 5);
                doc.setFont("helvetica", "normal");
                
                if (row.richL) {
                    let endX = drawRichText(doc, col1X, currentY, row.richL);
                    doc.setFont("helvetica", "normal");
                    doc.text(" :", endX, currentY);
                } else {
                    doc.text(row.l + " :", col1X, currentY);
                }

                if (row.richV) {
                    drawRichText(doc, col2X, currentY, row.richV);
                } else if (row.v) {
                    if (row.bold) doc.setFont("helvetica", "bold");
                    doc.text(row.v, col2X, currentY);
                }
                currentY += rowHeight;
            });

            let nextSectionY = currentY + 10;
            doc.setFontSize(14); doc.setFont("helvetica", "normal");
            doc.setTextColor(229, 0, 126);
            doc.text("3. Préconisation / Application", 20, nextSectionY);

            let boxY = nextSectionY + 5;
            doc.setFillColor(245, 245, 245);
            doc.rect(20, boxY, 170, 95, 'F');
            doc.setFontSize(16); doc.setTextColor(0, 53, 148);
            doc.text(currentResult.model, 105, boxY + 12, null, null, "center");
            doc.setDrawColor(200);
            doc.line(30, boxY + 17, 180, boxY + 17);

            if (currentResult.specs) {
                doc.setFontSize(10); doc.setTextColor(50);
                let specY = boxY + 25;
                const specsList = [
                    { l: "Type de système", v: "Duplex (Bi-colonne)", rL: "Dureté max", rV: currentResult.specs.hardness },
                    { l: "Résine", v: currentResult.specs.resin, rL: "Raccordement", rV: currentResult.specs.conn },
                    { l: "Débit pointe (1 bar)", v: currentResult.specs.flow1b, rL: "Dimensions", rV: currentResult.specs.dims },
                    { l: "Débit pointe (2 bars)", v: currentResult.specs.flow2b, rL: "Pression", rV: currentResult.specs.pressure },
                    { l: "Température", v: currentResult.specs.temp, rL: "Contrôle", rV: "Volumétrique non électrique" }
                ];
                specsList.forEach(row => {
                    doc.text(`${row.l} : ${row.v}`, 35, specY);
                    if (row.rL) doc.text(`${row.rL} : ${row.rV}`, 110, specY);
                    specY += 7;
                });
            }

            doc.setFontSize(9); doc.setTextColor(150);
            doc.text("Ce document est une simulation technique indicative fournie par Aqua Purify.", 20, 280);
            doc.text("Authorized Independent Kinetico Dealer - www.aquapurify.lu", 20, 285);

            doc.save(`Dimensionnement_${reportID}.pdf`);
        });

        loadData();
    }

    let attempts = 0;
    const interval = setInterval(function () {
        const root = document.getElementById(CONFIG.containerId);
        if (root) { 
            clearInterval(interval); 
            initWidget(); 
        }
        attempts++;
        if (attempts > 30) clearInterval(interval);
    }, 300);
})();
