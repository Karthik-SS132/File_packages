const btn = document.getElementById('btn');

btn.addEventListener('click', function handleClick(event) {
  // 👇️ if you are submitting a form
  event.preventDefault();

  const inputs = document.querySelectorAll('#first_name, #last_name');

  inputs.forEach(input => {
    input.value = '';
  });
});