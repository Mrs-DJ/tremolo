<script>
    export let advert_title;
    export let band_name;
    export let instrument_required;
    export let body;
</script>

<div>
    <h2>{advert_title}</h2>
    <p>{band_name}</p>
    <p>{instrument_required}</p>
    <p>{body.slice(0, 40) + "..."}</p>
</div>