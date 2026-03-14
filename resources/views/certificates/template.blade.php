<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sertifikat {{ $data['participant_name'] }}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        @page {
            size: A4 landscape;
            margin: 0;
        }

        body {
            font-family: 'DejaVu Sans', Arial, sans-serif;
            width: 297mm;
            min-height: 210mm;
            position: relative;
            /* overflow: hidden; */
            background-image: url("{{ public_path('storage/' . $certificate->design->image_1) }}");
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        }

        .certificate-container {
            width: 100%;
            position: relative;
            padding: 14mm;
            margin-top: 8mm;
            margin-left: 66mm;
            height: 100% overflow: hidden;
        }

        .certificate-content {
            width: 100%;
            max-width: 260mm;
            padding: 20px;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .header {
            margin-bottom: 15px;
        }

        .header-top {
            font-size: 42px;
            color: #6b7280;
            text-transform: uppercase;
            font-weight: 500;
        }

        .header-bottom p {
            font-size: 32px;
            margin-bottom: 2px;
        }

        .certificate-title {
            font-size: 110px;
            font-weight: bold;
            text-transform: uppercase;
            margin-bottom: -24px;
        }

        .certificate-subtitle {
            font-size: 60px;
            color: #082854;
            font-weight: 600;
            margin-bottom: 42px;
        }

        .content {
            position: relative;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin: 32px 0;
        }

        .content-number {
            position: absolute;
            text-align: right;
            top: -28mm;
            right: 65mm;
        }

        .certificate-number-text {
            font-size: 38px;
            color: #082854;
            margin-bottom: 4px;
            font-weight: 600;
        }

        .certificate-number {
            font-size: 38px;
            color: #082854;
        }

        .content-text {
            font-size: 42px;
            color: #082854;
            margin-top: 32px;
            margin-bottom: -32px;
        }

        .participant-name {
            font-size: 85px;
            font-weight: bold;
            color: #082854;
            margin: 52px 0;
            display: inline-block;
            min-width: 250px;
        }

        .program-name {
            color: #082854;
            display: block;
            margin-top: 24px;
            font-size: 60px;
            font-weight: 600;
        }

        .program-description {
            font-size: 42px;
            margin-top: 16px;
        }

        .description {
            font-size: 42px;
            max-width: 1920px;
            margin-top: 24px;
            padding-bottom: 38px;
            border-bottom: 6px dotted transparent;
        }

        .date {
            position: absolute;
            top: 80mm;
            right: 65mm;
            display: flex;
            justify-content: center;
            margin: 32px 0;
            width: 100mm;
            border-top: 2px solid #082854;
            padding-top: 8px;
        }

        .accreditation-label {
            float: left;
            width: 50%;
            font-size: 38px;
            color: #082854;
            margin-right: 16px;
        }

        .accreditation-date {
            float: right;
            width: 50%;
            font-size: 38px;
            color: #082854;
            text-align: right;
        }

        .footer {
            position: relative;
            margin-left: -57mm;
            height: 50px;
            clear: both;
        }

        .signature-container {
            float: left;
            width: 80%;
            text-align: left;
        }

        .period-section {
            float: right;
            width: 30%;
            text-align: left;
            margin-top: 150px;
            margin-right: 600px;
        }

        .qr-container {
            position: absolute;
            top: 48mm;
            left: -51.5mm;
        }

        .qr-code {
            width: 250px;
            height: 250px;
            margin: 32px;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            padding: 4px;
            background: white;
            display: block;
        }

        .qr-placeholder {
            width: 120px;
            height: 120px;
            margin: 0 auto 16px auto;
            border: 2px dashed #d1d5db;
            border-radius: 8px;
            background: #f9fafb;
            font-size: 10px;
            display: block;
        }

        .signature-space {
            width: 150px;
            height: 250px;
            margin-top: 80px;
            margin-bottom: -50px;
            position: relative;
        }

        .signature-image {
            max-width: 500px;
            max-height: 500px;
            object-fit: contain;
        }

        .signature-name {
            font-size: 42px;
            color: #082854;
            font-weight: bold;
            margin-bottom: 2px;
            text-decoration: underline;
        }

        .signature-title,
        .signature-date {
            font-size: 42px;
        }

        .footer::after {
            content: "";
            display: table;
            clear: both;
        }

        /* ===== Halaman 2 khusus bootcamp (style baru) ===== */
        .curriculum-page {
            page-break-before: always;
            width: 270mm;
            min-height: 210mm;
            padding: 16mm 14mm;
            background: #f3f4f6;
            color: #111827;
            position: relative;
        }

        .curriculum-inner {
            position: relative;
            z-index: 2;
        }

        .material-title {
            text-align: center;
            font-size: 22pt;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: .5px;
            margin-top: 10px;
            margin-bottom: 12px;
        }

        .material-divider {
            border: 0;
            border-top: 1px solid #9ca3af;
            margin-bottom: 18px;
            margin-top: 50px;
        }

        .material-meta {
            margin-top: 50px;
            margin-bottom: 50px;
        }

        .material-meta-row {
            font-size: 14pt;
            line-height: 1.2;
        }

        .material-meta-row span {
            display: inline-block;
            vertical-align: middle;
        }

        .material-meta-label {
            display: inline-block;
            width: 84px;
            font-weight: 500;
            margin-right: 150px;
        }

        .material-meta-colon {
            display: inline-block;
            width: 12px;
            text-align: center;
            margin-right: 30px;

        }

        .material-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13pt;
            background: transparent;
        }

        .material-table th,
        .material-table td {
            border: 1px solid #9ca3af;
            padding: 8px 10px;
            vertical-align: top;
        }

        .material-table th {
            font-size: 14pt;
            font-weight: 700;
            text-align: center;
            background: transparent;
        }

        .material-col-no {
            width: 52px;
            text-align: center;
        }

        .material-col-ket {
            width: 82px;
            text-align: center;
        }

        .material-check {
            font-size: 16pt;
            font-weight: 700;
        }

        .material-empty {
            font-size: 13pt;
            color: #6b7280;
            font-style: italic;
        }

        @media print {
            body {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
        }
    </style>
</head>

<body>
    {{-- Halaman 1 --}}
    <div class="certificate-container">
        <div class="certificate-content">
            <div class="header">
                <div class="certificate-title">Certificate</div>
                <div class="certificate-subtitle">
                    @if ($certificate->webinar_id)
                        of Participation
                    @else
                        of Achievement
                    @endif
                </div>
            </div>

            <div class="content">
                <div class="content-number">
                    <p class="certificate-number-text">Accreditation Number</p>
                    <p class="certificate-number">
                        {{ sprintf('%04d', $data['certificate_number']) }}/{{ $certificate->certificate_number }}
                    </p>
                </div>

                <div class="content-text">
                    This certificate is proudly presented to
                </div>

                <div class="participant-name">
                    {{ $data['participant_name'] }}
                </div>

                <div class="program-description">
                    as a participant who has successfully completed
                </div>

                <div class="program-name">
                    {{ $certificate->title }}
                </div>

                @if ($certificate->description)
                    <div class="description">
                        {{ $certificate->description }}
                    </div>
                @endif

                <div class="qr-container">
                    @if ($qrCode)
                        <div class="qr-code">
                            @if (str_contains($qrCode, 'image/png'))
                                <img src="{{ $qrCode }}" alt="QR Code"
                                    style="width: 100%; height: 100%; object-fit: contain;">
                            @else
                                {!! $qrCode !!}
                            @endif
                        </div>
                    @else
                        <div class="qr-placeholder">
                            QR Code<br>Not Available
                        </div>
                    @endif
                </div>

                <div class="date">
                    <p class="accreditation-label">Accreditation Date</p>
                    <p class="accreditation-date">
                        {{ \Carbon\Carbon::parse($certificate->issued_date)->locale('id')->translatedFormat('d F Y') }}
                    </p>
                </div>
            </div>

            <div class="footer">
                <div class="signature-container">
                    <div class="signature-space">
                        @if ($certificate->sign && $certificate->sign->image)
                            <img src="{{ public_path('storage/' . $certificate->sign->image) }}" alt="Tanda Tangan"
                                class="signature-image">
                        @else
                            <div style="color: #9ca3af; font-style: italic; font-size: 10px;">Tanda Tangan</div>
                        @endif
                    </div>

                    @if ($certificate->sign)
                        <div class="signature-name">{{ $certificate->sign->name }}</div>
                        <div class="signature-title">
                            {{ $certificate->sign->position ?? 'Direktur Kompeten' }}
                        </div>
                    @else
                        <div class="signature-name">Direktur</div>
                        <div class="signature-title">Kompeten</div>
                    @endif
                </div>

                <div class="period-section">
                    <div class="header-bottom">
                        <p>Kompeten IDN</p>
                        <p>Alamat : {{ $certificate->header_bottom }}</p>
                        <p>Whatspp: +62 895-2851-4480</p>
                        <p>Email: kompetenidn@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {{-- Halaman 2 khusus bootcamp --}}
    @if ($certificate->bootcamp_id && $certificate->bootcamp)
        @php
            $bootcamp = $certificate->bootcamp;
            $schedules = $bootcamp->schedules ? $bootcamp->schedules->sortBy('schedule_date')->values() : collect();

            // Periode
            $periodText = '-';
            if ($schedules->count() > 0) {
                $firstDate = \Carbon\Carbon::parse($schedules->first()->schedule_date);
                $lastDate = \Carbon\Carbon::parse($schedules->last()->schedule_date);
                $periodText = $firstDate->isSameDay($lastDate)
                    ? $firstDate->locale('id')->translatedFormat('d F Y')
                    : $firstDate->locale('id')->translatedFormat('d F Y') .
                        ' - ' .
                        $lastDate->locale('id')->translatedFormat('d F Y');
            } elseif (!empty($bootcamp->start_date)) {
                $startDate = \Carbon\Carbon::parse($bootcamp->start_date);
                $endDate = !empty($bootcamp->end_date) ? \Carbon\Carbon::parse($bootcamp->end_date) : null;
                $periodText = $endDate
                    ? $startDate->locale('id')->translatedFormat('d F Y') .
                        ' - ' .
                        $endDate->locale('id')->translatedFormat('d F Y')
                    : $startDate->locale('id')->translatedFormat('d F Y');
            }

            // Materi dari <li> curriculum, fallback ke jadwal
            $curriculumItems = collect();
            if (!empty($bootcamp->curriculum)) {
                preg_match_all('/<li[^>]*>(.*?)<\/li>/si', $bootcamp->curriculum, $matches);
                if (!empty($matches[1])) {
                    $curriculumItems = collect($matches[1])
                        ->map(fn($item) => trim(preg_replace('/\s+/', ' ', strip_tags($item))))
                        ->filter()
                        ->values();
                }
            }

            $materials = $curriculumItems->isNotEmpty()
                ? $curriculumItems
                : $schedules
                    ->map(function ($schedule) {
                        $date = \Carbon\Carbon::parse($schedule->schedule_date)
                            ->locale('id')
                            ->translatedFormat('d F Y');
                        $day = ucfirst($schedule->day);
                        $time =
                            \Carbon\Carbon::parse($schedule->start_time)->format('H:i') .
                            ' - ' .
                            \Carbon\Carbon::parse($schedule->end_time)->format('H:i') .
                            ' WIB';
                        return "Sesi {$day}, {$date} ({$time})";
                    })
                    ->values();
        @endphp

        <div class="curriculum-page">
            <div class="curriculum-inner">
                <div class="material-title">MATERI PEMBELAJARAN</div>
                <hr class="material-divider">

                <div class="material-meta">
                    <div class="material-meta-row">
                        <span class="material-meta-label">Nama</span>
                        <span class="material-meta-colon">:</span>
                        <span>{{ $data['participant_name'] }}</span>
                    </div>
                    <div class="material-meta-row">
                        <span class="material-meta-label">Periode</span>
                        <span class="material-meta-colon">:</span>
                        <span>{{ $periodText }}</span>
                    </div>
                </div>

                @if ($materials->count() > 0)
                    <table class="material-table">
                        <thead>
                            <tr>
                                <th class="material-col-no">No</th>
                                <th>Materi</th>
                                <th class="material-col-ket">Ket.</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($materials as $index => $material)
                                <tr>
                                    <td class="material-col-no">{{ $index + 1 }}</td>
                                    <td>{{ $material }}</td>
                                    <td class="material-col-ket"><span class="material-check">✔</span></td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                @else
                    <div class="material-empty">Materi belum tersedia.</div>
                @endif
            </div>
        </div>
    @endif
</body>

</html>
