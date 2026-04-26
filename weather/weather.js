const NIGERIA_STATES = {
      'Abia': { lat: 5.5320, lon: 7.4860, capital: 'Umuahia' },
      'Adamawa': { lat: 9.3265, lon: 12.3984, capital: 'Yola' },
      'Akwa Ibom': { lat: 5.0377, lon: 7.9128, capital: 'Uyo' },
      'Anambra': { lat: 6.2209, lon: 7.0729, capital: 'Awka' },
      'Bauchi': { lat: 10.3158, lon: 9.8442, capital: 'Bauchi' },
      'Bayelsa': { lat: 4.9267, lon: 6.2676, capital: 'Yenagoa' },
      'Benue': { lat: 7.7322, lon: 8.5391, capital: 'Makurdi' },
      'Borno': { lat: 11.8333, lon: 13.1500, capital: 'Maiduguri' },
      'Cross River': { lat: 4.9589, lon: 8.3269, capital: 'Calabar' },
      'Delta': { lat: 5.5320, lon: 5.8987, capital: 'Asaba' },
      'Ebonyi': { lat: 6.3249, lon: 8.1120, capital: 'Abakaliki' },
      'Edo': { lat: 6.3350, lon: 5.6037, capital: 'Benin City' },
      'Ekiti': { lat: 7.6211, lon: 5.2214, capital: 'Ado-Ekiti' },
      'Enugu': { lat: 6.4413, lon: 7.4988, capital: 'Enugu' },
      'Gombe': { lat: 10.2897, lon: 11.1718, capital: 'Gombe' },
      'Imo': { lat: 5.4836, lon: 7.0334, capital: 'Owerri' },
      'Jigawa': { lat: 12.0022, lon: 9.5616, capital: 'Dutse' },
      'Kaduna': { lat: 10.5105, lon: 7.4165, capital: 'Kaduna' },
      'Kano': { lat: 12.0022, lon: 8.5920, capital: 'Kano' },
      'Katsina': { lat: 12.9883, lon: 7.6006, capital: 'Katsina' },
      'Kebbi': { lat: 12.4500, lon: 4.1999, capital: 'Birnin Kebbi' },
      'Kogi': { lat: 7.8000, lon: 6.7333, capital: 'Lokoja' },
      'Kwara': { lat: 8.5000, lon: 4.5500, capital: 'Ilorin' },
      'Lagos': { lat: 6.5244, lon: 3.3792, capital: 'Ikeja' },
      'Nasarawa': { lat: 8.5000, lon: 8.0000, capital: 'Lafia' },
      'Niger': { lat: 9.6159, lon: 6.5539, capital: 'Minna' },
      'Ogun': { lat: 7.1608, lon: 3.3483, capital: 'Abeokuta' },
      'Ondo': { lat: 7.2500, lon: 5.2000, capital: 'Akure' },
      'Osun': { lat: 7.5629, lon: 4.5200, capital: 'Osogbo' },
      'Oyo': { lat: 7.3775, lon: 3.9470, capital: 'Ibadan' },
      'Plateau': { lat: 9.9167, lon: 8.9000, capital: 'Jos' },
      'Rivers': { lat: 4.8156, lon: 7.0498, capital: 'Port Harcourt' },
      'Sokoto': { lat: 13.0059, lon: 5.2476, capital: 'Sokoto' },
      'Taraba': { lat: 8.8939, lon: 11.3667, capital: 'Jalingo' },
      'Yobe': { lat: 11.7440, lon: 11.9964, capital: 'Damaturu' },
      'Zamfara': { lat: 12.1704, lon: 6.6642, capital: 'Gusau' },
      'FCT': { lat: 9.0765, lon: 7.3986, capital: 'Abuja' }
    };

    const weatherCodes = {
      0: { desc: 'Clear', icon: '☀️' },
      1: { desc: 'Mainly clear', icon: '🌤️' },
      2: { desc: 'Partly cloudy', icon: '⛅' },
      3: { desc: 'Overcast', icon: '☁️' },
      45: { desc: 'Fog', icon: '🌫️' },
      48: { desc: 'Rime fog', icon: '🌫️' },
      51: { desc: 'Light drizzle', icon: '🌦️' },
      53: { desc: 'Drizzle', icon: '🌦️' },
      55: { desc: 'Heavy drizzle', icon: '🌧️' },
      61: { desc: 'Light rain', icon: '🌧️' },
      63: { desc: 'Rain', icon: '🌧️' },
      65: { desc: 'Heavy rain', icon: '⛈️' },
      71: { desc: 'Light snow', icon: '🌨️' },
      73: { desc: 'Snow', icon: '❄️' },
      75: { desc: 'Heavy snow', icon: '❄️' },
      80: { desc: 'Showers', icon: '🌦️' },
      81: { desc: 'Moderate showers', icon: '🌧️' },
      82: { desc: 'Violent showers', icon: '⛈️' },
      95: { desc: 'Thunderstorm', icon: '⛈️' },
      96: { desc: 'T-storm + hail', icon: '⛈️' },
      99: { desc: 'Heavy T-storm', icon: '⛈️' }
    };

    const cache = new Map();
    const CACHE_TIME = 10 * 60 * 1000;

    function getUVInfo(uv) {
      if (uv <= 2) return { level: 'Low', color: 'var(--uv-low)' };
      if (uv <= 5) return { level: 'Moderate', color: 'var(--uv-moderate)' };
      if (uv <= 7) return { level: 'High', color: 'var(--uv-high)' };
      if (uv <= 10) return { level: 'Very High', color: 'var(--uv-veryhigh)' };
      return { level: 'Extreme', color: 'var(--uv-extreme)' };
    }

    function getWindDirection(degrees) {
      const dirs = ['↑', '↗', '→', '↘', '↓', '↙', '←', '↖'];
      const index = Math.round(degrees / 45) % 8;
      return dirs[index];
    }

    function toggleTheme() {
      document.body.classList.toggle('dark');
      const isDark = document.body.classList.contains('dark');
      localStorage.setItem('theme', isDark? 'dark' : 'light');
      document.getElementById('themeToggle').textContent = isDark? '☀️' : '🌙';
    }

    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark');
      document.getElementById('themeToggle').textContent = '☀️';
    }

    function requestLocation() {
      const errorDiv = document.getElementById('gateError');
      errorDiv.textContent = 'Requesting location...';

      if (!navigator.geolocation) {
        errorDiv.textContent = 'Geolocation not supported by your browser';
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          document.getElementById('locationGate').classList.add('hidden');
          document.getElementById('app').classList.remove('hidden');
          initApp();
        },
        (error) => {
          errorDiv.textContent = 'Location denied. This app requires location to work.';
        }
      );
    }

    function initApp() {
      const select = document.getElementById('stateSelect');
      Object.keys(NIGERIA_STATES).sort().forEach(state => {
        const option = document.createElement('option');
        option.value = state;
        option.textContent = `${state} - ${NIGERIA_STATES[state].capital}`;
        select.appendChild(option);
      });

      const savedState = localStorage.getItem('defaultState') || 'FCT';
      select.value = savedState;
      loadStateWeather();
    }

    function searchCity() {
      const query = document.getElementById('searchInput').value.toLowerCase();
      const resultsDiv = document.getElementById('searchResults');

      if (query.length < 2) {
        resultsDiv.classList.remove('active');
        return;
      }

      const matches = Object.entries(NIGERIA_STATES).filter(([state, data]) =>
        state.toLowerCase().includes(query) || data.capital.toLowerCase().includes(query)
      );

      if (matches.length === 0) {
        resultsDiv.classList.remove('active');
        return;
      }

      resultsDiv.innerHTML = matches.map(([state, data]) =>
        `<div class="search-item" onclick="selectCity('${state}')">${data.capital}, ${state}</div>`
      ).join('');
      resultsDiv.classList.add('active');
    }

    function selectCity(state) {
      document.getElementById('stateSelect').value = state;
      document.getElementById('searchInput').value = '';
      document.getElementById('searchResults').classList.remove('active');
      loadStateWeather();
    }

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-wrapper')) {
        document.getElementById('searchResults').classList.remove('active');
      }
    });

    async function loadStateWeather() {
      const state = document.getElementById('stateSelect').value;
      if (!state) return;

      localStorage.setItem('defaultState', state);

      const weatherDiv = document.getElementById('weather');
      const stateData = NIGERIA_STATES[state];

      const cached = cache.get(state);
      if (cached && Date.now() - cached.timestamp < CACHE_TIME) {
        displayWeather(cached.data, state, stateData.capital, cached.timestamp);
        return;
      }

      weatherDiv.innerHTML = '<div class="loading">Loading 7-day forecast...</div>';

      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${stateData.lat}&longitude=${stateData.lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,wind_direction_10m,apparent_temperature,uv_index&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=Africa/Lagos&forecast_days=7&forecast_hours=24`;

        const response = await fetch(url);
        if (!response.ok) throw new Error('API failed');

        const data = await response.json();
        cache.set(state, { data, timestamp: Date.now() });
        displayWeather(data, state, stateData.capital, Date.now());

      } catch (error) {
        weatherDiv.innerHTML = `<div class="loading" style="color:#e74c3c">Failed: ${error.message}</div>`;
      }
    }

    function formatTime(timeStr) {
      const date = new Date(timeStr);
      return date.toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit', hour12: true });
    }

    function displayWeather(data, state, capital, timestamp) {
      const current = data.current;
      const daily = data.daily;
      const hourly = data.hourly;
      const weather = weatherCodes[current.weather_code] || { desc: 'Unknown', icon: '❓' };
      const updateTime = new Date(timestamp).toLocaleTimeString('en-NG', {
        hour: '2-digit', minute: '2-digit'
      });

      const sunrise = formatTime(daily.sunrise[0]);
      const sunset = formatTime(daily.sunset[0]);
      const uvInfo = getUVInfo(current.uv_index);
      const windArrow = getWindDirection(current.wind_direction_10m);

      let hourlyHTML = '';
      for (let i = 0; i < 12; i++) {
        const time = new Date(hourly.time[i]);
        const hour = time.getHours();
        const timeStr = hour === 0? '12am' : hour === 12? '12pm' : hour > 12? `${hour-12}pm` : `${hour}am`;
        const hWeather = weatherCodes[hourly.weather_code[i]] || { icon: '❓', desc: 'Unknown' };
        const precip = hourly.precipitation_probability[i];

        hourlyHTML += `
          <div class="hourly-item">
            <div class="hourly-time">${timeStr}</div>
            <div class="hourly-icon">${hWeather.icon}</div>
            <div class="hourly-temp">${Math.round(hourly.temperature_2m[i])}°</div>
            <div class="hourly-precip">
              <div class="precip-bar">
                <div class="precip-fill" style="width: ${precip}%"></div>
              </div>
              <div class="precip-text">${precip}%</div>
            </div>
            <div class="hourly-desc">${hWeather.desc}</div>
          </div>
        `;
      }

      let forecastHTML = '';
      for (let i = 0; i < 7; i++) {
        const date = new Date(daily.time[i]);
        const dayName = i === 0? 'Today' : date.toLocaleDateString('en-NG', { weekday: 'short' });
        const dWeather = weatherCodes[daily.weather_code[i]] || { desc: 'Unknown', icon: '❓' };

        forecastHTML += `
          <div class="forecast-day">
            <div class="forecast-day-name">${dayName}</div>
            <div class="forecast-icon">${dWeather.icon}</div>
            <div class="forecast-temp">${Math.round(daily.temperature_2m_max[i])}° / ${Math.round(daily.temperature_2m_min[i])}°</div>
            <div class="forecast-desc">${dWeather.desc}</div>
          </div>
        `;
      }

      document.getElementById('weather').innerHTML = `
        <div class="current-weather">
          <div class="city">${capital}, ${state}</div>
          <div class="weather-icon">${weather.icon}</div>
          <div class="temp">${Math.round(current.temperature_2m)}°C</div>
          <div class="description">${weather.desc}</div>
          <div class="uv-index">
            <div class="uv-badge" style="background: ${uvInfo.color}">UV ${Math.round(current.uv_index)}</div>
            <div class="uv-text">${uvInfo.level}</div>
          </div>
          <div class="sun-times">
            <div class="sun-item">
              <div class="sun-icon">🌅</div>
              <div class="sun-data">
                <div class="sun-label">Sunrise</div>
                <div class="sun-time">${sunrise}</div>
              </div>
            </div>
            <div class="sun-item">
              <div class="sun-icon">🌇</div>
              <div class="sun-data">
                <div class="sun-label">Sunset</div>
                <div class="sun-time">${sunset}</div>
              </div>
            </div>
          </div>
          <div class="details">
            <div class="detail-item">
              <span class="detail-label">Feels Like</span>
              <span class="detail-value">${Math.round(current.apparent_temperature)}°C</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Humidity</span>
              <span class="detail-value">${current.relative_humidity_2m}%</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Wind</span>
              <span class="detail-value">
                <span class="wind-arrow" style="transform: rotate(${current.wind_direction_10m}deg)">${windArrow}</span>
                ${current.wind_speed_10m} km/h
              </span>
            </div>
            <div class="detail-item">
              <span class="detail-label">UV Index</span>
              <span class="detail-value">${Math.round(current.uv_index)}</span>
            </div>
          </div>
        </div>
        <div class="section-title">Next 12 Hours</div>
        <div class="hourly-forecast">${hourlyHTML}</div>
        <div class="section-title">7-Day Forecast</div>
        <div class="forecast-grid">${forecastHTML}</div>
        <div class="updated">Updated ${updateTime}</div>
      `;
    }