<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sertifikat {{ $data['participant_name'] }}</title>
    <style>
        @font-face {
            font-family: 'Glacial';
            font-weight: normal;
            font-style: normal;
            src: url('/assets/fonts/GlacialIndifference-Regular.ttf') format('truetype');
        }

        @font-face {
            font-family: 'Glacial';
            font-weight: bold;
            font-style: normal;
            src: url('/assets/fonts/GlacialIndifference-Bold.ttf') format('truetype');
        }

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
            font-family: 'Glacial';
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
            font-weight: normal;
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
            font-weight: bold;
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
            font-weight: bold;
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
            font-weight: bold;
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

        /* Second Page Styling */
        .second-page-container {
            width: 100%;
            position: relative;
            padding: 20mm;
        }

        .second-page-header {
            margin-bottom: 20px;
            padding-bottom: 12px;
        }

        .second-title {
            font-size: 52px;
            font-weight: bold;
            text-transform: uppercase;
        }

        .second-subtitle {
            font-size: 28px;
            color: #4b5563;
            margin-top: 6px;
            font-weight: 500;
        }

        .second-content-grid {
            margin-top: 24px;
            width: 100%;
        }

        .column-full {
            width: 100%;
        }

        .section-card {
            background: rgba(255, 255, 255, 0.9);
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 24px;
            min-height: 380px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }

        .table-nilai {
            width: 100%;
            border-collapse: collapse;
        }

        .table-nilai th {
            background-color: #1e40af;
            color: white;
            font-size: 20px;
            padding: 12px;
            text-align: left;
            font-weight: bold;
        }

        .table-nilai td {
            font-size: 20px;
            padding: 14px 12px;
            border-bottom: 1px solid #e5e7eb;
            color: #374151;
        }

        .second-page-footer {
            position: absolute;
            bottom: 20mm;
            left: 20mm;
            right: 20mm;
            border-top: 2px solid #e5e7eb;
            padding-top: 15px;
        }

        .meta-text {
            font-size: 20px;
            color: #4b5563;
            font-weight: 500;
        }

        .meta-right {
            float: right;
            text-align: right;
        }

        .meta-left {
            float: left;
            text-align: left;
        }

        /* Transcript vs Syllabus Premium Design Differences */
        .transcript-header {
            border-bottom: 3px solid #1e40af;
        }
        
        .syllabus-header {
            border-bottom: 3px solid #059669; /* Green/emerald for syllabus */
        }
        
        .second-page-header.transcript-header .second-title {
            color: #1e40af;
        }
        
        .second-page-header.syllabus-header .second-title {
            color: #059669;
        }
        
        .transcript-card {
            border-left: 6px solid #1e40af;
        }
        
        .syllabus-card {
            border-left: 6px solid #059669; /* Green/emerald accent */
        }
        
        .syllabus-grid {
            width: 100%;
        }
        
        .syllabus-col {
            float: left;
            width: 48%;
        }
        
        .syllabus-col:first-child {
            margin-right: 4%;
        }
        
        .syllabus-item {
            margin-bottom: 20px;
            background: #f9fafb;
            padding: 18px;
            border-radius: 10px;
            border: 1px solid #e5e7eb;
        }
        
        .item-title {
            font-size: 20px;
            font-weight: bold;
            color: #059669;
            margin-bottom: 6px;
        }
        
        .item-desc {
            font-size: 16px;
            color: #4b5563;
            line-height: 1.5;
        }
        
        .row-summary td {
            font-weight: bold;
            background-color: #f3f4f6;
            color: #1e40af;
            border-top: 2px solid #1e40af;
        }

        .curriculum-page {
            width: 297mm;
            min-height: 210mm;
            @if(!empty($certificate->design->image_2))
                background-image: url("{{ public_path('storage/' . $certificate->design->image_2) }}");
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
            @else background: white;
            @endif color: #111827;
            position: relative;
        }

        .curriculum-inner {
            position: relative;
            z-index: 2;
            padding: 16mm 20mm;
        }

        .material-title {
            text-align: center;
            font-size: 25pt;
            font-weight: 700;
            color: #082854;
            margin-top: 20px;
            margin-bottom: 10px;
        }

        .material-period {
            text-align: center;
            font-size: 15pt;
            color: #082854;
            margin-bottom: 100px;
        }

        .material-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 12pt;
            background: transparent;
            color: #082854;
            padding-right: 260px;
            padding-left: 260px;

        }

        .material-table th {
            font-weight: bold;
            font-size: 15pt;
            color: #082854;
            padding-top: 20px;
            padding-bottom: 33px;
            border-top: 2pt solid #082854;
            border-bottom: 2pt solid #082854;
            text-align: center;
            padding-right: 64px;
            padding-left: 64px;
        }

        .material-table td {
            padding: 30px 10px;
            border: none;
            color: #082854;
        }

        .material-table tbody tr:first-child td {
            padding-top: 100px;
        }

        .material-table tbody tr:last-child td {
            border-bottom: 2pt solid #082854;
            padding-bottom: 130px;
        }

        .material-col-no {
            width: 80px;
            text-align: center;
        }

        .material-col-name {
            text-align: left;
            padding-left: 60px !important;
        }

        th.material-col-name {
            text-align: center !important;
            padding-left: 10px !important;
        }

        .material-col-status {
            width: 120px;
            text-align: center;
        }

        th.material-col-score, th.material-col-grade {
            text-align: center !important;
            padding-left: 10px !important;
            padding-right: 10px !important;
        }

        .material-check {
            font-size: 15pt;
            font-family: 'Sinteca';
        }

        .material-empty {
            font-size: 14pt;
            color: #082854;
            font-style: italic;
            text-align: center;
            margin-top: 40px;
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
                                <img src="{{ $qrCode }}" alt="QR Code" style="width: 100%; height: 100%; object-fit: contain;">
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
    @if ($certificate->page_count == 2)
        @if ($certificate->second_page_grade)
            @php
                $gradesData = collect();
                if ($participant && !empty($participant->grades)) {
                    $gradesData = collect($participant->grades);
                } else {
                    $dummyAspects = !empty($certificate->assessment_subjects)
                        ? $certificate->assessment_subjects
                        : [
                            'Tugas Akhir & Portofolio Aplikasi Real-World',
                            'Evaluasi Teori, Kuis & Pemahaman Konseptual',
                            'Keaktifan, Kolaborasi Proyek & Partisipasi Diskusi'
                        ];
                    foreach ($dummyAspects as $index => $subject) {
                        $score = 0;
                        if ($score >= 80) {
                            $grade = 'A';
                        } elseif ($score >= 70) {
                            $grade = 'B';
                        } elseif ($score >= 45) {
                            $grade = 'C';
                        } elseif ($score >= 25) {
                            $grade = 'D';
                        } else {
                            $grade = 'E';
                        }

                        $gradesData->push([
                            'subject' => $subject,
                            'score' => $score,
                            'grade' => $grade
                        ]);
                    }
                }
            @endphp

            @if ($gradesData->count() > 0)
                @foreach ($gradesData->chunk(6) as $chunkIndex => $chunkGrades)
                    <div class="curriculum-page" style="{{ $chunkIndex > 0 ? 'page-break-before: always;' : '' }}">
                        <div class="curriculum-inner">
                            @if ($chunkIndex === 0)
                                <div class="material-title">TRANSKRIP EVALUASI KOMPETENSI</div>
                                <div class="material-period">Bootcamp: {{ $data['program_name'] }}</div>
                            @else
                                <div style="margin-top: 80px;"></div>
                            @endif

                            <table class="material-table">
                                <thead>
                                    <tr>
                                        <th class="material-col-no">No</th>
                                        <th class="material-col-name">Aspek Penilaian / Kompetensi</th>
                                        <th class="material-col-score" style="width: 120px; text-align: center;">Nilai</th>
                                        <th class="material-col-grade" style="width: 120px; text-align: center;">Grade</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($chunkGrades as $index => $gradeItem)
                                        <tr>
                                            <td class="material-col-no">{{ ($chunkIndex * 6) + $loop->iteration }}</td>
                                            <td class="material-col-name">{{ $gradeItem['subject'] }}</td>
                                            <td class="material-col-status" style="width: 120px; text-align: center;">
                                                {{ $gradeItem['score'] ?? '-' }}</td>
                                            <td class="material-col-status" style="width: 120px; text-align: center; font-weight: bold;">
                                                {{ $gradeItem['grade'] ?? '-' }}</td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                @endforeach
            @endif
        @elseif ($certificate->second_page_material)
            @php
                $bootcamp = $certificate->bootcamp;
                $schedules = $bootcamp && $bootcamp->schedules ? $bootcamp->schedules->sortBy('schedule_date')->values() : collect();

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
                } elseif ($bootcamp && !empty($bootcamp->start_date)) {
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
                if ($bootcamp && !empty($bootcamp->curriculum)) {
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

            @if ($materials->count() > 0)
                @foreach ($materials->chunk(6) as $chunkIndex => $chunkMaterials)
                    <div class="curriculum-page" style="{{ $chunkIndex > 0 ? 'page-break-before: always;' : '' }}">
                        <div class="curriculum-inner">
                            @if ($chunkIndex === 0)
                                <div class="material-title">{{ $certificate->title }}</div>
                                <div class="material-period">{{ $periodText }}</div>
                            @else
                                <div style="margin-top: 80px;"></div>
                            @endif

                            <table class="material-table">
                                <thead>
                                    <tr>
                                        <th class="material-col-no">No</th>
                                        <th class="material-col-name">Materi Pelatihan</th>
                                        <th class="material-col-status">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($chunkMaterials as $index => $material)
                                        <tr>
                                            <td class="material-col-no">{{ ($chunkIndex * 6) + $loop->iteration }}</td>
                                            <td class="material-col-name">{{ $material }}</td>
                                            <td class="material-col-status"><span class="material-check">✓</span></td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                @endforeach
            @else
                <div class="curriculum-page">
                    <div class="curriculum-inner">
                        <div class="material-title">{{ $certificate->title }}</div>
                        <div class="material-period">{{ $periodText }}</div>
                        <div class="material-empty">Materi belum tersedia.</div>
                    </div>
                </div>
            @endif
        @endif
    @endif
</body>

</html>